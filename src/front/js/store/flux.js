const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            clients: [],
            products: [],
            error: null,
        },
        actions: {
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            createClient: async (clientData) => {
                setStore({ error: null });
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/clients`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(clientData),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error al crear cliente');
                    }

                    const newClient = await response.json();
                    setStore({ clients: [...getStore().clients, newClient] });
                    return newClient;
                } catch (error) {
                    console.error("Error creating client:", error);
                    setStore({ error: error.message });
                    throw error;
                }
            },

            createClientsBulk: async (clientsArray) => {
                setStore({ error: null });
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/clients/bulk`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(clientsArray),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error en la carga masiva');
                    }

                    const createdClients = await response.json();
                    setStore({ clients: [...getStore().clients, ...createdClients] });
                    return createdClients;
                } catch (error) {
                    console.error("Error in bulk upload:", error);
                    setStore({ error: error.message });
                    throw error;
                }
            },

            getClients: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/clients");
                    if (!response.ok) throw new Error("Error fetching clients");
                    const clients = await response.json();
                    setStore({ clients });
                } catch (error) {
                    console.error("Error fetching clients:", error);
                }
            },

            searchClients: async (searchTerm) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/clients?search=${searchTerm}`);
                    if (!response.ok) {
                        throw new Error("Error searching clients");
                    }
                    const clients = await response.json();
                    setStore({ clients: clients });
                } catch (error) {
                    console.error("Error searching clients:", error);
                    setStore({ error: error.message });
                }
            },

            clearError: () => {
                setStore({ error: null });
            },

            deleteClient: async (client_id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/clients/${client_id}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) throw new Error("Error deleting client");
                    const result = await response.json();
                    getActions().getClients(); // Actualiza la lista de clientes después de eliminar
                    return { success: true, message: "Cliente eliminado correctamente." };

                } catch (error) {
                    console.error("Error deleting client:", error);
                    return { success: false, message: "Error al eliminar el cliente." };
                }
            },

            deleteProduct: async (product_id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/products/${product_id}`, {
                        method: "DELETE",
                    })
                    if (!response.ok) throw new Error("Error deleting client");
                    const result = await response.json();
                    getActions().getProducts();
                    return { success: true, message: "Producto eliminado correctamente." };
                } catch (error) {
                    console.error("Error deleting product:", error);
                    return { success: false, message: "Error al eliminar el producto." };
                }
            },
            getProducts: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "api/products");
                    if (!response.ok) {
                        throw new Error("Error fetching products");
                    }
                    const products = await response.json();
                    setStore({ products: products });
                } catch (error) {
                    console.error("Error fetching products:", error);
                    setStore({ error: error.message });
                }
            },
            searchProducts: async (searchTerm) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/products?search=${searchTerm}`);
                    if (!response.ok) {
                        throw new Error("Error searching products");
                    }
                    const products = await response.json();
                    setStore({ products: products });
                } catch (error) {
                    console.error("Error searching products:", error);
                    setStore({ error: error.message });
                }
            },
            createProduct: async (productData) => {
                setStore({ error: null });
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/products`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(productData),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error al crear producto');
                    }

                    const newProduct = await response.json();
                    setStore({ products: [...getStore().products, newProduct] });
                    return newProduct;
                } catch (error) {
                    console.error("Error creating product:", error);
                    setStore({ error: error.message });
                    throw error;
                }
            },
            createProductsBulk: async (productsArray) => {
                setStore({ error: null });
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}api/products/bulk`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(productsArray),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error en la carga masiva de productos');
                    }

                    const createdProducts = await response.json();
                    setStore({ products: [...getStore().products, ...createdProducts] });
                    return createdProducts;
                } catch (error) {
                    console.error("Error in bulk upload of products:", error);
                    setStore({ error: error.message });
                    throw error;
                }
            },
        },
    };
};
export default getState