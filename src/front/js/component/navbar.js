import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuItems = [
    { to: "/", icon: "fas fa-home", text: "Inicio" },
    { to: "/nuevo_remito", icon: "fas fa-file-alt", text: "Nuevo remito" },
    { to: "/nuevo_cliente", icon: "fas fa-user-plus", text: "Nuevo cliente" },
    { to: "/nuevo_producto", icon: "fas fa-user-plus", text: "Nuevo producto" },
  ];

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {menuItems.map((item, index) => (
        <li key={index} className="nav-item">
          <Link to={item.to} className="nav-link">
            <i className={`${item.icon} me-2`}></i> {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const Navbar = () => {
  return (
      <div className="container-fluid">
        <Link className="" to="/">Mi Aplicación</Link>
        
          <Menu />
        
      </div>
  );
};