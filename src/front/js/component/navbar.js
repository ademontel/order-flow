import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuItems = [
    { to: "/", icon: "fas fa-home", text: "Inicio" },
    { to: "/nuevo_remito", icon: "fas fa-file-alt", text: "Nuevo remito" },
    { to: "/nuevo_cliente", icon: "fas fa-user-plus", text: "Nuevo cliente" },
    { to: "/nuevo_producto", icon: "fas fa-user-plus", text: "Nuevo producto" },
  ];

  return (
    <ul className="list-group list-group-flush">
      {menuItems.map((item, index) => (
        <li key={index} className="list-group-item bg-transparent border-0">
          <Link to={item.to} className="navbar-brand">
            <i className={`${item.icon} me-2`}></i> {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="col-md-3 m-0 rounded sidebar-col-3">
      <button
        className="navbar-toggler clean-toggler z-2 d-lg-none position-fixed top-0 start-0 m-3 d-md-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarNav"
        aria-controls="sidebarNav"
      >
        ☰ Menú
      </button>
      <div
        className="offcanvas offcanvas-start bg-body-tertiary"
        tabIndex="-1"
        id="sidebarNav"
        aria-labelledby="sidebarNavLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title m-2" id="sidebarNavLabel">
            Hola Usuario!
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <Menu /> {/* Usa el componente Menu aquí */}
        </div>
      </div>

      <div className="sidebar">
        <h5 className="sidebar-title m-2 text-center">Hola, Usuario!</h5>
        <Menu /> {/* Y también aquí */}
      </div>
    </div>
  );
};
