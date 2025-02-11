from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    token = db.Column(db.String(200), nullable=True)
    # ... other user fields

    def __repr__(self):
        return f'<User {self.email}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            # ... other user fields, BUT NOT the password_hash
        }

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    rut = db.Column(db.String(12), unique=True, nullable=False)
    remitos = db.relationship('Remito', backref='client', lazy=True)

    def __repr__(self):
        return f'<Client {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "phone": self.phone,
            "email": self.email,
            "rut": self.rut
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(50), unique=True, nullable=False)
    nombre = db.Column(db.String(120), nullable=False)
    coleccion = db.Column(db.String(100))
    genero = db.Column(db.String(50))
    talles = db.Column(db.ARRAY(db.String))
    colores = db.Column(db.ARRAY(db.String))
    precio = db.Column(db.Float, nullable=False)
    remito_items = db.relationship('RemitoItem', backref='product', lazy=True)

    def __repr__(self):
        return f'<Product {self.sku}>'

    def serialize(self):
        return {
            "id": self.id,
            "sku": self.sku,
            "nombre": self.nombre,
            "coleccion": self.coleccion,
            "genero": self.genero,
            "talles": self.talles,
            "colores": self.colores,
            "precio": self.precio
        }

class Remito(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    estado_pago = db.Column(db.String(50), default="Pendiente")
    condicion_pago = db.Column(db.String(50))
    total = db.Column(db.Float)
    items = db.relationship('RemitoItem', backref='remito', lazy=True)

    def __repr__(self):
        return f'<Remito {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "date": self.date.isoformat(),
            "estado_pago": self.estado_pago,
            "condicion_pago": self.condicion_pago,
            "total": self.total
        }

class RemitoItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    remito_id = db.Column(db.Integer, db.ForeignKey('remito.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<RemitoItem {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "remito_id": self.remito_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "price": self.price
        }

def calculate_debt(client_id, start_date=None, end_date=None):
    client = Client.query.get(client_id)
    if not client:
        return None

    remitos = client.remitos

    if start_date:
        remitos = [r for r in remitos if r.date >= start_date]
    if end_date:
        remitos = [r for r in remitos if r.date <= end_date]

    total_debt = 0
    for remito in remitos:
        if remito.estado_pago != "Pagado":
            total_debt += remito.total
    return total_debt