import React, { useEffect, useState } from 'react';

const initialTaskList = [];

const TaskList = ({agenda}) =>{

	const [isHovered, setIsHovered] = useState(null);

	return (
		<div className='full-component'>
			<div className='to-do-list'>
				<div className='list-header'>
					<div className='user-name'>
						<p className='user-name-text'>{agenda.slug}'s agenda</p>
					</div>
					<button className='delete-user-button' onClick={() => {}}>Delete Agenda</button>
					<button className='add-button' onClick={() => {}}>create contact</button>
				</div>
				
				<div>
					{(agenda.contacts.length === 0) ? <div className='no-tasks'><p>No tasks. Add a task.</p></div> : <></>}
					<ul className='list'>
						{agenda.contacts.map((contact, index) => (
							<li className='list-item'
								key={index}>
								<div className='list-item-div' onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(null)}>
									<span>
										<h5 className='contact'>{contact.name}</h5>
										<p className="contact-info">📞 {contact.phone}</p>
										<p className="contact-info">📧 {contact.email}</p>
										<p className="contact-info">📍 {contact.address}</p>
									</span>
									<button 
										className={isHovered == index ? 'delete-button-active' : 'delete-button-hidden'}
										onClick={() => {}}
										>
										✖
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className='extra-pages'>
				<div className='second-page'></div>
				<div className='third-page'></div>
			</div>
			<br/>
		</div>
	) 
}

export default TaskList;