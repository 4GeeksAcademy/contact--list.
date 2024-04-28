const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agendas: []
		},
		actions: {
			addAgenda: async (slug, id, contacts) => {
				// Fetch data or use variables from somewhere

				// For example, I'm using passed parameters for simplicity
				const newAgenda = {
					slug: slug,
					id: id,
					contacts: contacts
				};
				
				// Get the current store
				const store = getStore();
				
				// Add the new agenda object to the agendas array in the store
				const updatedAgendas = [...store.agendas, newAgenda];
				
				// Update the store with the new agendas array
				setStore({ agendas: updatedAgendas });
			}
		}
	};
};

export default getState;
