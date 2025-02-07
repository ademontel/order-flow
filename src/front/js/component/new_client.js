import React, { useState } from "react";

export const Client = () => {
    const [cliente, setCliente] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
        rut: '',
    });

    const handleChange = (event) => {
        setCliente({
            ...cliente,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar los datos del cliente a tu backend o realizar alguna otra acción
        console.log(cliente);
    };

    return (
        <div className="col-6 mx-auto m-2">

            <h1>Nuevo Cliente</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="direccion"
                        name="direccion"
                        value={cliente.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={cliente.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rut">RUT</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rut"
                        name="rut"
                        value={cliente.rut}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success mt-3 mx-auto d-block">
                    Guardar
                </button>
            </form>
        </div>
    );
}