import { useEffect, useState } from 'react'
import { Target } from './components/Target'
import { TaskForm } from './components/TaskForm'

function App() {
  const [task, setTask] = useState([])

  useEffect(() => {

    const viewTasks = async () => {
      try {

        const res = await fetch('http://localhost:1234/tasks')
        const resultTask = await res.json()

        setTask(resultTask)
      } catch (error) {

        console.error("Hubo un error al conectar con el backend", error)
      }
    }
    viewTasks()
  },[])

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:1234/tasks/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const updateTasks = task.filter(tsk => tsk.id !== id)
        setTask(updateTasks)
      }

    } catch (error) {
       console.error("Hubo un error al eliminar tarea", error)
    }
  }

  const addTask = async (newTaskData) => {
    try {
      const response = await fetch('http://localhost:1234/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTaskData)
      })

      if (response.ok) {
          const createdTask = await response.json()
          setTask([...task, createdTask.tarea])
      }
      
    } catch (error) {
      console.error("Hubo un error al crear la tarea", error)
    }
  }

  const modifyTask = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:1234/tasks/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus}) 
      })
      if (response.ok) {
        

        const updatedTasks = task.map(tsk => {
          if (tsk.id === id) {
            return {...tsk, status: newStatus }
          }
          return tsk
        })
        setTask(updatedTasks)
      }
    } catch (error) {
      console.error("Hubo un error al crear la tarea", error)
    }
  }


return (
  
  <div className='bg-slate-900 min-h-screen flex flex-col items-center p-4 md:p-6'>
    
    {/* Formulario para añadir tareas */}
    <TaskForm addNewTask={addTask}/>
    
    
    <div className='w-full flex flex-col md:flex-row md:justify-center md:items-start gap-4 md:gap-6 font-raleway mt-6'>
      
      {/* 1. COLUMNA: PENDIENTE */}
      <div className='w-full md:w-80 bg-slate-700/30 md:rounded-2xl border border-slate-700/50 flex flex-col p-3 rounded-xl'>
        <div className='border-b-2 border-red-700/50 mb-3'>
          <h2 className='text-red-500 font-semibold p-2 text-center text-lg'>Pendiente</h2>
        </div>
        <div className='flex flex-col gap-3'>
          {task
            .filter(tsk => tsk.status === "Pendiente")
            .map(tsk => (
              <Target 
                key={tsk.id}
                {...tsk}
                onDelete={deleteTask}
                onModify={modifyTask}
              />
            ))}
        </div>
      </div>

      {/* 2. COLUMNA: EN PROCESO */}
      <div className='w-full md:w-80 bg-slate-700/30 md:rounded-2xl border border-slate-700/50 flex flex-col p-3 rounded-xl'>
        <div className='border-b-2 border-yellow-500/50 mb-3'>
          <h2 className='text-yellow-400 font-semibold p-2 text-center text-lg'>En proceso</h2>
        </div>
        <div className='flex flex-col gap-3'>
          {task
            .filter(tsk => tsk.status === "En proceso")
            .map(tsk => (
              <Target 
                key={tsk.id}
                {...tsk}
                onDelete={deleteTask}
                onModify={modifyTask}
              />
            ))}
        </div>
      </div>

      {/* 3. COLUMNA: COMPLETADA */}
      <div className='w-full md:w-80 bg-slate-700/30 md:rounded-2xl border border-slate-700/50 flex flex-col p-3 rounded-xl'>
        <div className='border-b-2 border-green-500/50 mb-3'>
          <h2 className='text-green-500 font-semibold p-2 text-center text-lg'>Completada</h2>
        </div>
        <div className='flex flex-col gap-3'>
          {task
            .filter(tsk => tsk.status === "Completada")
            .map(tsk => (
              <Target 
                key={tsk.id}
                {...tsk}
                onDelete={deleteTask}
                onModify={modifyTask}
              />
            ))}
        </div>
      </div>

    </div>
  </div>
)
}

export default App
