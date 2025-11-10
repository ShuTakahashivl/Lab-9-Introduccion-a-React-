import { useState, useEffect } from 'react'
import type { Task } from './types'

function App(){
	// Cargar tareas desde localStorage al iniciar
	const [input, setInput] = useState('')
	const [tasks, setTasks] = useState<Task[]>(() => {
		const savedTasks = localStorage.getItem('tasks')
		return savedTasks ? JSON.parse(savedTasks) : []
	})

	// Guardar tareas en localStorage cada vez que cambien
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	// Calcular tareas pendientes
	const pendingCount = tasks.filter(t => !t.done).length

	function addTask (){
		const inputFree = input.trim();
		if ( inputFree === '') return;
		const newTask: Task = {
			id: Date.now(),
			text: inputFree,
			done: false
		}
		setTasks([newTask, ...tasks])
		setInput('')
	}

	const toggleTask = (id: number) => {
		setTasks(tasks.map( t => 
				t.id === id ? {...t, done: !t.done} : t
			)
		)
	}

	const removeTask = (id: number) => {
		setTasks(
			tasks.filter(task => task.id !== id)
		)
	}

	return (
		<div>
			<h1> Todo List </h1>
			{/* Contador de tareas pendientes */}
			<p>Tareas pendientes: {pendingCount}</p>

			<br/>
			<div>
				<input
					 type="text"
					 placeholder="Nueva tarea..."
					 value={input}
					 onChange={e => setInput(e.target.value)}
				/>
				<button onClick={addTask}> Agregar Tareita </button>
			</div>
			<div>
				<ul className="lista-tareas">
					{tasks.length === 0 && (
						<li> No hay Tareas aún. </li>
					)}
					{tasks.map(task => (
						<li 
							key={task.id}
							className="linea-tarea"
						>
							 <span 
							 	className={task.done ? 'done' : ''}
							 	onClick={ () => toggleTask(task.id) }
							 	title="Marcar como completada"> 
							 	{task.text} 
							 </span>
							 <button
							 	onClick={ () => removeTask(task.id) }
							  	title="Eliminar Tarea"
							 >
							 	x
							 </button>
						</li>
					))}
				</ul>
			</div>

		</div>
	)
}

export default App;