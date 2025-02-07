"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Client, Product, Remito, RemitoItem, calculate_debt
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api, resources={r"/api/*": {"origins": "https://glorious-space-goldfish-4vjqwpgr5j9h4w6-3000.app.github.dev"}})

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    try:
        new_product = Product(
            sku=data['sku'],
            coleccion=data['coleccion'],
            genero=data['genero'],
            talle=data['talle'],
            colores=data['colores'],
            precio=data['precio']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api.route('/users', methods=['POST'])
def register_user():
    data = request.get_json()
    try:
        new_user = User(
            name=data['name'],
            lastname=data['lastname'],
            email=data['email'],
        )
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api.route('/clients', methods=['POST'])
def create_client():
    data = request.get_json()  # Obtener los datos del cliente del cuerpo de la petición (JSON)
    try:
        # Crear una nueva instancia del modelo Client con los datos recibidos
        new_client = Client(
            name=data['nombre'],        
            address=data['direccion'],
            phone=data['telefono'],
            email=data['email'],
            rut=data['rut']
        )
        # Añadir el nuevo cliente a la sesión de la base de datos
        db.session.add(new_client)
        # Guardar los cambios en la base de datos
        db.session.commit()
        # Devolver una respuesta JSON con el cliente recién creado (y código 201 Created)
        return jsonify(new_client.serialize()), 201  # 201 significa "Creado"
    except KeyError as e:  # Manejar errores si faltan campos requeridos
        db.session.rollback()  # Revertir cualquier cambio en la base de datos
        return jsonify({"error": f"Falta el campo requerido: {e}"}), 400  # 400 Bad Request
    except Exception as e:  # Manejar otros errores (ej. error de base de datos)
        db.session.rollback()  # Revertir cualquier cambio en la base de datos
        return jsonify({"error": str(e)}), 500  # 500 Internal Server Error
    
@api.route('/clients/bulk', methods=['POST'])
def create_clients_bulk():
    data = request.get_json()
    try:
        clients = []
        for client_data in data:
            new_client = Client(
                name=client_data['nombre'],
                address=client_data['direccion'],
                phone=client_data['telefono'],
                email=client_data['email'],
                rut=client_data['rut']
            )
            db.session.add(new_client)
            clients.append(new_client)
        db.session.commit()
        return jsonify([client.serialize() for client in clients]), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    
@api.route('/clients', methods=['GET']) # Nueva ruta para obtener clientes
def get_clients():
    try:
        clients = Client.query.all()
        serialized_clients = [c.serialize() for c in clients]
        return jsonify(serialized_clients), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/clients/<int:client_id>/debt', methods=['GET'])
def get_client_debt(client_id):
    start_date_str = request.args.get('start_date')
    end_date_str = request.args.get('end_date')

    start_date = datetime.fromisoformat(start_date_str) if start_date_str else None
    end_date = datetime.fromisoformat(end_date_str) if end_date_str else None

    debt = calculate_debt(client_id, start_date, end_date)

    if debt is None:
        return jsonify({"error": "Client not found"}), 404

    return jsonify({"debt": debt}), 200

@api.route('/remitos', methods=['POST'])
def create_remito():
    data = request.get_json()
    try:
        client_id = data['client_id']
        product_items = data['items']  # Array of {product_id, quantity}
        condicion_pago = data.get('condicion_pago') # Optional

        client = Client.query.get(client_id)
        if not client:
            return jsonify({"error": "Client not found"}), 404

        new_remito = Remito(client_id=client_id, condicion_pago=condicion_pago)
        db.session.add(new_remito)
        db.session.flush() # Get the remito ID immediately

        total_remito = 0

        for item in product_items:
            product = Product.query.get(item['product_id'])
            if not product:
                db.session.rollback()
                return jsonify({"error": f"Product {item['product_id']} not found"}), 404

            new_item = RemitoItem(
                remito_id=new_remito.id,
                product_id=item['product_id'],
                quantity=item['quantity'],
                price = product.precio # Store the price at the time of sale
            )
            db.session.add(new_item)
            total_remito += new_item.price * new_item.quantity

        new_remito.total = total_remito
        db.session.commit()
        return jsonify(new_remito.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

# Ejemplo de ruta para obtener todos los remitos de un cliente
@api.route('/clients/<int:client_id>/remitos', methods=['GET'])
def get_client_remitos(client_id):
    try:
        client = Client.query.get(client_id)
        if not client:
            return jsonify({"error": "Client not found"}), 404

        remitos = [r.serialize() for r in client.remitos]  # Serializar los remitos

        return jsonify(remitos), 200 # Devuelve una lista de diccionarios

    except Exception as e:
        return jsonify({"error": str(e)}), 500 # Error interno del servidor


# Ejemplo de ruta para obtener un remito específico
@api.route('/remitos/<int:remito_id>', methods=['GET'])
def get_remito(remito_id):
    try:
        remito = Remito.query.get(remito_id)
        if not remito:
            return jsonify({"error": "Remito not found"}), 404

        return jsonify(remito.serialize()), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Ejemplo de ruta para obtener los items de un remito
@api.route('/remitos/<int:remito_id>/items', methods=['GET'])
def get_remito_items(remito_id):
    try:
        remito = Remito.query.get(remito_id)
        if not remito:
            return jsonify({"error": "Remito not found"}), 404

        items = [item.serialize() for item in remito.items]
        return jsonify(items), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    