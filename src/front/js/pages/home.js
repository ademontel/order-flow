import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { FaTimes, FaEdit } from 'react-icons/fa';

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [msg, setMsg] = useState("");
	const [searchTermClient, setSearchTermClient] = useState("");
	const [searchTermProduct, setSearchTermProduct] = useState("");

	useEffect(() => {
		actions.getClients();
		actions.getProducts();
	}, []);

	const handleSearchClient = () => {
		actions.searchClients(searchTermClient);
	};

	const handleSearchProducts = () => {
		actions.searchProducts(searchTermProduct);
	};

	const handleDeleteClient = async (client_id) => {
		const response = await actions.deleteClient(client_id);
		if (!response.success) {
			setMsg(response.message);
		} else {
			setMsg("Cliente eliminado correctamente.");
			
		}
	};

	const handleDeleteProduct = async (product_id) => {
		const response = await actions.deleteProduct(product_id)
		if (!response.success) {
			setMsg(response.message);
		} else {
			setMsg("Producto eliminado correctamente.");
		}
	};

	return (
		<div className="col-md">
			<div className="container-fluid">
				<h1>Dashboard</h1>
				<div className="row">
				{msg && <p style={{ color: msg.includes("correctamente") ? "green" : "red", textAlign: 'center' }}>{msg}</p>}
					<div className="col-12 col-md-6">
						<h2>Clientes</h2>
						<div style={{ display: 'flex', marginBottom: '10px' }}>
							<input
								type="text"
								placeholder="Buscar cliente..."
								value={searchTermClient}
								onChange={(e) => setSearchTermClient(e.target.value)}
								style={{ flex: 1, marginRight: '10px' }}
							/>
							<button onClick={handleSearchClient} style={{ padding: '5px 10px' }}>Buscar</button>
						</div>
						<ul style={{ listStyleType: 'none', padding: 0 }}>
							<li style={{ backgroundColor: 'lightsteelblue', display: 'flex', justifyContent: 'space-between', padding: '10px', fontWeight: 'bold' }}>
								<span>Cliente</span>
								<span>Acción</span>
							</li>
							{store.clients && store.clients.map((client) => (
								<li key={client.id} style={{ backgroundColor: store.clients.indexOf(client) % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'white', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
									<span>{client.name}</span>
									<div>
										<button
											onClick={() => actions.editClient(client.id)}
											style={{ cursor: 'pointer', marginLeft: '10px', background: 'none', border: 'none' }}
										>
											<FaEdit />
										</button>
										<button
											onClick={() => handleDeleteClient(client.id)}
											style={{ color: 'red', cursor: 'pointer', marginLeft: '10px', background: 'none', border: 'none' }}
										>
											<FaTimes />
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
					<div className="col-12 col-md-6">
						<h2>Productos</h2>
						<div style={{ display: 'flex', marginBottom: '10px' }}>
							<input
								type="text"
								placeholder="Buscar producto..."
								value={searchTermProduct}
								onChange={(e) => setSearchTermProduct(e.target.value)}
								style={{ flex: 1, marginRight: '10px' }}
							/>
							<button onClick={handleSearchProducts} style={{ padding: '5px 10px' }}>Buscar</button>
						</div>
						<ul style={{ listStyleType: 'none', padding: 0 }}>
							<li style={{ backgroundColor: 'lightsteelblue', display: 'flex', justifyContent: 'space-between', padding: '10px', fontWeight: 'bold' }}>
								<span>Producto</span>
								<span>Acción</span>
							</li>
							{store.products && store.products.map((product) => (							 
								<li key={product.id} style={{ backgroundColor: store.products.indexOf(product) % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'white', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
									<span>{product.nombre}</span>
									<div>
										<button
											onClick={() => actions.editProduct(product.id)}
											style={{ cursor: 'pointer', marginLeft: '10px', background: 'none', border: 'none' }}
										>
											<FaEdit />
										</button>
										<button
											onClick={() => handleDeleteProduct(product.id)}
											style={{ color: 'red', cursor: 'pointer', marginLeft: '10px', background: 'none', border: 'none' }}
										>
											<FaTimes />
										</button>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

			</div>
		</div>
	);
};
