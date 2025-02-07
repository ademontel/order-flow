import React, { useState } from "react";

export const Client = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    rut: '',
  });

  const [bulkClients, setBulkClients] = useState(''); // Para el área de texto

  const handleChange = (event) => {
    setCliente({
      ...cliente,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Cliente individual:", cliente);
    // Lógica para enviar 'cliente' al backend
  };

  const handleBulkChange = (event) => {
    setBulkClients(event.target.value);
  };

  const handleBulkSubmit = (event) => {
    event.preventDefault();
    try {
      const clientsArray = JSON.parse(bulkClients); // Intenta parsear el JSON
      console.log("Clientes masivos:", clientsArray);
      // Lógica para enviar 'clientsArray' al backend (validar estructura primero)
    } catch (error) {
      console.error("Error al parsear JSON:", error);
      alert("JSON inválido. Por favor, revisa la estructura."); // Alerta al usuario
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const clientsArray = JSON.parse(e.target.result);
        console.log("Clientes desde archivo:", clientsArray);
        // Lógica para enviar 'clientsArray' al backend (validar estructura primero)
      } catch (error) {
        console.error("Error al parsear JSON del archivo:", error);
        alert("JSON inválido en el archivo. Por favor, revisa la estructura.");
      }
    };

    reader.readAsText(file);
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

      <h2 className="mt-4">Carga Masiva de Clientes (JSON)</h2>

      {/* Opción 1: Área de texto */}
      <div className="form-group">
        <label htmlFor="bulkClients">JSON de Clientes (Array)</label>
        <textarea
          className="form-control"
          id="bulkClients"
          rows="5"
          value={bulkClients}
          onChange={handleBulkChange}
          placeholder="Ejemplo: [{&quot;nombre&quot;: &quot;Cliente 1&quot;, ...}, {...}]" // Ejemplo
        />
      </div>
      <button type="button" className="btn btn-success mt-3 mx-auto d-block" onClick={handleBulkSubmit}>
        Cargar varios clientes
      </button>

      {/* Opción 2: Subida de archivo */}
      <div className="form-group mt-3">
        <label htmlFor="fileUpload"> Subir Archivo JSON </label><br/>
        <input type="file" className="form-control-file" id="fileUpload" onChange={handleFileUpload} accept=".json" />
      </div>

    </div>
  );
};