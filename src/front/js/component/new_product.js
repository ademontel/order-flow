import React, { useState, useContext } from "react";
import { FaTimes } from 'react-icons/fa';
import { Context } from "../store/appContext";

export const NuevoProducto = () => {
  const { actions } = useContext(Context);
  const [producto, setProducto] = useState({
    sku: "",
    nombre: "",
    coleccion: "",
    genero: "",
    colores: [],
    nuevoColor: "",
    talles: [],
    nuevoTalle: "",
    precio:"",

  });

  const [bulkProducts, setBulkProducts] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "precio" ? value.replace(",", ".") : value;
    setProducto({
      ...producto,
      [name]: newValue,
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
      const nuevosColores = producto.nuevoColor.split(",").map(color => color.trim()).filter(color => color !== "");
      setProducto({
        ...producto,
        colores: [...producto.colores, ...nuevosColores],
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

  const handleSizeChange = (event) => {
    setProducto({
      ...producto,
      nuevoTalle: event.target.value,
    });
  };
  const handleAddSize = () => {
    if (producto.nuevoTalle.trim() !== "") {
      const nuevosTalles = producto.nuevoTalle.split(",").map(talle => talle.trim()).filter(talle => talle !== "");
      setProducto({
        ...producto,
        talles: [...producto.talles, ...nuevosTalles],
        nuevoTalle: "",
      });
    }
  };

  const handleDeleteSize = (size) => {
    setProducto({
      ...producto,
      talles: producto.talles.filter((c) => c !== size),
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Nuevo producto:", producto);
    try {
      await actions.createProduct(producto)
      alert("Producto creado exitosamente");
    } catch(error){
      console.error("Error al crear producto:", error);
      alert("Error al crear producto");
    }
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
    <div className="w-75 p-0 m-3">
      <h1>Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        {/* ... (campos del formulario: sku, nombre, coleccion, genero, talle) */}
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
          <label htmlFor="sku">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={producto.nombre}
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

        {/* Manejo de talles */}
        <div className="form-group">
          <label>Talles</label>
          <div>
            {producto.talles.map((talle) => (
              <div key={talle} className="badge bg-secondary me-2">
                {talle}
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-1"
                  onClick={() => handleDeleteSize(talle)}
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
              value={producto.nuevoTalle}
              onChange={handleSizeChange}
              placeholder="Añadir talle (puedes agregar varios separados por coma)"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleAddSize}
            >
              Añadir
            </button>
          </div>
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
              placeholder="Añadir color (puedes agregar varios separados por coma)"
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
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            placeholder="Ingrese el precio con un decimal. Ej: 254,1"
            step="0.1" // Permite valores de punto flotante con dos decimales
            min="0"
            required
          />
        </div>

        <button type="submit" className="btn btn-success mt-3 mx-auto d-block">
          Guardar Producto
        </button>
      </form>

      <h2>Carga Masiva de Productos (JSON)</h2>

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
        <label htmlFor="fileUpload">Subir Archivo JSON</label><br />
        <input
          type="file"
          className="form-control-file w-100"
          id="fileUpload"
          onChange={handleFileUpload}
          accept=".json"
        />
      </div>
    </div>
  );
};