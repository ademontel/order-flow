  
import os
from flask_admin import Admin
from .models import db, User, Client, Product, Remito, RemitoItem, calculate_debt
from flask_admin.contrib.sqla import ModelView

class ProductAdmin(ModelView):
    # Especifica las columnas que deseas mostrar en la lista
    column_list = ('id', 'sku', 'nombre', 'coleccion', 'genero', 'talles', 'colores', 'precio')

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Client, db.session))
    admin.add_view(ProductAdmin(Product, db.session))
    admin.add_view(ModelView(Remito, db.session))
    admin.add_view(ModelView(RemitoItem, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))