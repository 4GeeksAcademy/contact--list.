const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agendas: []
		},
		actions: {
			addAgenda: async (slug, id, contacts) => {
				const newAgenda = {
					slug: slug,
					id: id,
					contacts: contacts
				};
				const store = getStore();
				const updatedAgendas = [...store.agendas, newAgenda];
				setStore({ agendas: updatedAgendas });
			},

			deleteContact: (agendaSlug, contactId) => {
				const store = getStore();
				const agenda = store.agendas.find(a => a.slug === agendaSlug);
				if (!agenda) {
					console.error(`Agenda with slug ${agendaSlug} not found.`);
					return;
				}
				const updatedContacts = agenda.contacts.filter(c => c.id !== contactId);
				const updatedAgendas = store.agendas.map(a => {
					if (a.slug === agendaSlug) {
						return { ...a, contacts: updatedContacts };
					}
					return a;
				});
				
				setStore({ agendas: updatedAgendas });
			},

			createContact: (contactInfo, agenda) => {
				console.log('Creating contact with info:', contactInfo);
				fetch('https://playground.4geeks.com/contact/agendas/' + agenda + '/contacts', {
					method: 'POST',
					headers: {
						'accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: contactInfo.name,
						phone: contactInfo.phone,
						email: contactInfo.email,
						address: contactInfo.address
					})
				})
				.then(response => {
					if (response.ok) {
						console.log('New contact created successfully');
					}
					else {
						throw new Error('Failed to add new task');
					}
				})
				.catch(error => {
					console.error(error);
				})

				const store = getStore();
				const storeAgenda = store.agendas.find(a => a.slug === agenda);
				if (!storeAgenda) {
					console.error(`Agenda with slug ${agenda} not found.`);
					return;
				}
				const updatedContacts = [...storeAgenda.contacts];
				updatedContacts.push({
					name: contactInfo.name,
					phone: contactInfo.phone,
					email: contactInfo.email,
					address: contactInfo.address
				})

				console.log('updatedContacts:');
				console.log(updatedContacts);	
				const updatedAgendas = store.agendas.map(a => {
					if (a.slug === agenda) {
						return { ...a, contacts: updatedContacts };
					}
					return a;
				});
				setStore({ agendas: updatedAgendas });
			}
		}
	};
};

export default getState;
