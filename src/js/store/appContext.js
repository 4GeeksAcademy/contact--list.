import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			fetch("https://playground.4geeks.com/contact/agendas")
			.then(response => response.json())
			.then(json => {
				let agendasLength = json.agendas.length;
				for (let i = 0; i < agendasLength; i++){
					let agenda = json.agendas[i];
					let contact = {};
					let contacts = [];
					fetch("https://playground.4geeks.com/contact/agendas/" + agenda.slug)
					.then(resp => resp.json())
					.then (json => {
						for (let j = 0; j < json.contacts.length; j++){
							contact = {
								name: json.contacts[j].name,
								phone: json.contacts[j].phone,
								email: json.contacts[j].email,
								address: json.contacts[j].address,
								id: json.contacts[j].id
							}
							contacts.push(contact);
						}
					})
					.then(()=> {
						state.actions.addAgenda(agenda.slug, agenda.id, contacts);
					})
					.catch((error) => {
						console.error("error1 fetching data: ", error);
					});
				}
			})
			.catch((error) => {
				console.error("error fetching data: ", error);
			});
		}, []);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;