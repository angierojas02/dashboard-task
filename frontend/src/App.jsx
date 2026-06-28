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
    <div className='bg-slate-900'>
      <TaskForm addNewTask={addTask}/>
      <div className='md:grid grid-cols-3 w-full flex flex-col font-raleway'>
        {/*PENDIENTE*/}
        <div>
          {task.
          filter(tsk => tsk.status === "Pendiente")
          .map(tsk => (
            <Target key={tsk.id}
            {...tsk}
            onDelete={deleteTask}
            onModify={modifyTask}
            
            />
          ))}
        </div>

        {/*EN PROCESO*/}
          <div>
            {task.
            filter(tsk => tsk.status === "En proceso")
            .map(tsk => (
              <Target key={tsk.id}
              {...tsk}
              onDelete={deleteTask}
              onModify={modifyTask}
              />
            ))}
        </div>

         {/*COMPLETADO*/}
        <div>
          {task.
          filter(tsk => tsk.status === "Completada")
          .map(tsk => (
            <Target key={tsk.id}
            {...tsk}
            onDelete={deleteTask}
            onModify={modifyTask}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default App
