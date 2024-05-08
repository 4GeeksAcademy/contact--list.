import React, { useState, useEffect, useContext } from "react";
import TaskList from "../component/taskList.jsx";

import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<ul className="mt-5">
			{store.agendas.map((agenda, index) => {
				return (
					<li key={index}>
						<TaskList agenda={agenda}/>
					</li>
				)
			})}
			</ul>
		</div>
	);
};
