import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Client = () => {
  const { actions } = useContext(Context);
  const [cliente, setCliente] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    rut: '',
  });

  const [bulkClients, setBulkClients] = useState('');

  const handleChange = (event) => {
    setCliente({
      ...cliente,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Cliente individual:", cliente);
    try {
      await actions.createClient(cliente);
      alert("Cliente creado exitosamente");
    } catch (error) {
      console.error("Error al crear cliente:", error);
      alert("Error al crear cliente");
    }
  };

  const handleBulkChange = (event) => {
    setBulkClients(event.target.value);
  };

  const handleBulkSubmit = async (event) => {
    event.preventDefault();
    try {
      const clientsArray = JSON.parse(bulkClients);
      console.log("Clientes masivos:", clientsArray);
      await actions.createClientsBulk(clientsArray);
      alert("Clientes creados exitosamente");
    } catch (error) {
      console.error("Error al parsear JSON:", error);
      alert("JSON inválido. Por favor, revisa la estructura.");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const clientsArray = JSON.parse(e.target.result);
        console.log("Clientes desde archivo:", clientsArray);
        await actions.createClientsBulk(clientsArray);
        alert("Clientes creados exitosamente");
      } catch (error) {
        console.error("Error al parsear JSON del archivo:", error);
        alert("JSON inválido en el archivo. Por favor, revisa la estructura.");
      }
    };

    reader.readAsText(file, 'UTF-8');
  };

  return (
    <div className="w-75 m-3 p-0">
      <div>
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
              placeholder="Ejemplo: Juan Perez"
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
              placeholder="Ejemplo: Calle Falsa 123"
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
              placeholder="Ejemplo: 099123456"
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
              placeholder="Ejemplo: juan@example.com"
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
              placeholder="Ejemplo: 217415240014"
            />
          </div>
          <button type="submit" className="btn btn-success mt-3 mx-auto d-block">Crear Cliente</button>
        </form>

        <h2>Carga Masiva de Clientes</h2>
        <form onSubmit={handleBulkSubmit}>
          <div className="form-group">
            <label htmlFor="bulkClients">Clientes (JSON)</label>
            <textarea
              className="form-control"
              id="bulkClients"
              name="bulkClients"
              value={bulkClients}
              onChange={handleBulkChange}
              rows="6"
              required
              placeholder='Ejemplo: [{ "nombre": "Juan Perez", "direccion": "Calle Falsa 123", "telefono": "123456789", "email": "juan@example.com", "rut": "12345678-9" }, { ... }]'
            />
          </div>
          <button type="submit" className="btn btn-success mt-3 mx-auto d-block">Cargar Clientes</button>
        </form>
        <div>
          <label htmlFor="fileUpload">Subir Archivo JSON</label><br/>
          <input type="file" onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};