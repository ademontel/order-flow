const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            clients: [], 
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
                    const response = await fetch('/api/clients/bulk', {
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
                const response = await fetch('/api/clients'); 
                if (!response.ok) {
                    throw new Error("Error fetching clients");
                }
                const clients = await response.json();
                setStore({ clients: clients }); 
              } catch (error) {
                console.error("Error fetching clients:", error);
                setStore({ error: error.message }); 
              }
            },

            clearError: () => {
                setStore({ error: null });
            },
        },
    };
};
export default getState