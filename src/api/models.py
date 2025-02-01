from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    lastname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    token = db.Column(db.String(200), nullable=True)
    shipping_address = db.Column(db.String(200), nullable=True)
    shipping_phone = db.Column(db.String(120), nullable=True)
    shipping_method = db.Column(db.String(120), nullable=True)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "shipping_address": self.shipping_address,
            "shipping_phone": self.shipping_phone,
            "shipping_method": self.shipping_method
        }

