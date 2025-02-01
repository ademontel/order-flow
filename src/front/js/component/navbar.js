import React from 'react';

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">

				<a className="navbar-brand" href="#">Fashion Store</a>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Women</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Men</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Accessories</a>
						</li>
						<li className="nav-item">
							<a className="nav-link disabled" aria-disabled="true">Sale</a>
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Buscar artículo" aria-label="Buscar" />
						<button className="btn btn-outline-dark" type="submit">
							<i className="fa-solid fa-magnifying-glass"></i>
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

