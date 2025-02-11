import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { FaTimes, FaEdit } from 'react-icons/fa';

export const Home = () => {
	const { store, actions } = useContext(Context);
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

	return (
		<div className="col-md">
			<div className="container-fluid">
				<h1>Dashboard</h1>
				<div className="row">
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
							{store.clients && store.clients.map((client, index) => (
								<li key={index} style={{ backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'white', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
									<span>{client.name}</span>
									<div>
										<button 
											onClick={() => actions.editClient(client.id)} 
											style={{ cursor: 'pointer', marginLeft: '10px', background: 'none', border: 'none' }}
										>
											<FaEdit />
										</button>
										<button 
											onClick={() => actions.deleteClient(client.id)} 
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
							{console.log(store.products)}
							{store.products && store.products.map((product, index) => (
								<li key={index} style={{ backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'white', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
									<span>{product.name}</span>
									<div>
										<button 
											onClick={() => actions.editProduct(product.id)} 
											style={{ cursor: 'pointer', marginLeft: '10px', background: 'none', border: 'none' }}
										>
											<FaEdit />
										</button>
										<button 
											onClick={() => actions.deleteProduct(product.id)} 
											style={{ cursor: 'pointer', marginLeft: '10px', background: 'none', border: 'none' }}
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
