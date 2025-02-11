import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const menuItems = [
    { to: "/", icon: "fas fa-home", text: " Inicio" },
    { to: "/nuevo_remito", icon: "fas fa-file-alt", text: " Nuevo remito" },
    { to: "/nuevo_cliente", icon: "fas fa-user-plus", text: " Nuevo cliente" },
    { to: "/nuevo_producto", icon: "fa-solid fa-shirt", text: " Nuevo producto" },
  ];

  const userItems = [
    { to: "/user-edit", icon: "fa-solid fa-gear", text: " Editar usuario " },
    { to: "/logout", icon: "fa-solid fa-power-off", text: " Desloguearse" },
  ];

  return (
    <>
      <ul className="navbar-nav text-center mx-auto mb-2 mb-lg-0">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link to={item.to} className="nav-link">
              <i className={`${item.icon}`}></i>
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="navbar-bottom d-flex align-items-end" style={{ position: 'absolute', bottom: '0' }}>
        <ul className="navbar-nav text-center mx-auto mb-2 mb-lg-0">
          {userItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link to={item.to} className="nav-link">
                <i className={`${item.icon}`}></i>
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const Navbar = () => {
  return (
    <div className="sidebar p-2" style={{ position: 'relative', height: '97vh' }}>
      <div className="welcome my-4 text-center">
        Hola, usuario!
      </div>
      <Menu />
    </div>
  );
};