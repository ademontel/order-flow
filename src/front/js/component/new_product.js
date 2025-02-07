import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';

export const NuevoProducto = () => {
  const [producto, setProducto] = useState({
    sku: "",
    coleccion: "",
    genero: "",
    talle: "",
    colores: [],
    nuevoColor: "",
  });

  const [bulkProducts, setBulkProducts] = useState("");

  const handleChange = (event) => {
    setProducto({
      ...producto,
      [event.target.name]: event.target.value,
    });
  };

  const handleColorChange = (event) => {
    setProducto({
      ...producto,
      nuevoColor: event.target.value,
    });
  };

  const handleAddColor = () => {
    if (producto.nuevoColor.trim() !== "") {
      setProducto({
        ...producto,
        colores: [...producto.colores, producto.nuevoColor.trim()],
        nuevoColor: "",
      });
    }
  };

  const handleDeleteColor = (color) => {
    setProducto({
      ...producto,
      colores: producto.colores.filter((c) => c !== color),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Nuevo producto:", producto);
    // Lógica para enviar 'producto' al backend
  };

  const handleBulkChange = (event) => {
    setBulkProducts(event.target.value);
  };

  const handleBulkSubmit = (event) => {
    event.preventDefault();
    try {
      const productsArray = JSON.parse(bulkProducts);
      console.log("Productos masivos:", productsArray);
      // Lógica para enviar 'productsArray' al backend (validar estructura primero)
    } catch (error) {
      console.error("Error al parsear JSON:", error);
      alert("JSON inválido. Por favor, revisa la estructura.");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const productsArray = JSON.parse(e.target.result);
        console.log("Productos desde archivo:", productsArray);
        // Lógica para enviar 'productsArray' al backend (validar estructura primero)
      } catch (error) {
        console.error("Error al parsear JSON del archivo:", error);
        alert("JSON inválido en el archivo. Por favor, revisa la estructura.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="col-6 mx-auto m-2">
      <h1>Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        {/* ... (campos del formulario: sku, coleccion, genero, talle) */}
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            className="form-control"
            id="sku"
            name="sku"
            value={producto.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="coleccion">Colección</label>
          <input
            type="text"
            className="form-control"
            id="coleccion"
            name="coleccion"
            value={producto.coleccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genero">Género</label>
          <select
            className="form-control"
            id="genero"
            name="genero"
            value={producto.genero}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="talle">Talle</label>
          <input
            type="text"
            className="form-control"
            id="talle"
            name="talle"
            value={producto.talle}
            onChange={handleChange}
            required
          />
        </div>


        {/* Manejo de colores */}
        <div className="form-group">
          <label>Colores</label>
          <div>
            {producto.colores.map((color) => (
              <div key={color} className="badge bg-secondary me-2">
                {color}
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-1"
                  onClick={() => handleDeleteColor(color)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
          <div className="input-group mt-2">
            <input
              type="text"
              className="form-control"
              value={producto.nuevoColor}
              onChange={handleColorChange}
              placeholder="Añadir color"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleAddColor}
            >
              Añadir
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-3 mx-auto d-block">
          Guardar Producto
        </button>
      </form>

      <h2 className="mt-4">Carga Masiva de Productos (JSON)</h2>

      <div className="form-group">
        <label htmlFor="bulkProducts">JSON de Productos (Array)</label>
        <textarea
          className="form-control"
          id="bulkProducts"
          rows="5"
          value={bulkProducts}
          onChange={handleBulkChange}
          placeholder='Ejemplo: [{ "sku": "ABC-123", "coleccion": "Verano 2024", "genero": "masculino", "talle": "M", "colores": ["negro", "blanco"] }, { ... }]'
        />
      </div>
      <button
        type="button"
        className="btn btn-success mt-3 mx-auto d-block"
        onClick={handleBulkSubmit}
      >
        Cargar varios productos
      </button>

      <div className="form-group mt-3">
        <label htmlFor="fileUpload">Subir Archivo JSON</label><br/>
        <input
          type="file"
          className="form-control-file"
          id="fileUpload"
          onChange={handleFileUpload}
          accept=".json"
        />
      </div>
    </div>
  );
};