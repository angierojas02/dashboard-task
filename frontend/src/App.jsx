import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [task, setTask] = useState([])

  useEffect(() => {

    const viewTasks = async () => {
      try {

        const response = await fetch('http://localhost:1234/tasks')
        const resultTask = await response.json()

        setTask(resultTask)
      } catch (error) {

        console.error("Hubo un error al conectar con el backend", error)
      }
    }
    viewTasks()
  },[])


  return (
    <>
      <div className='grid grid-cols-3 w-full'>
        {/*PENDIENTE*/}
        <div className='shadow w-80 m-3 p-4'>
          {task.
          filter(tsk => tsk.status === "Pendiente")
          .map(tsk => (
            <div key={tsk.id}>
              <strong>{tsk.title}</strong>
              <p>{tsk.description}</p>
              <p><strong>Prioridad: </strong>{tsk.priority}</p>
              <p><strong>Estado: </strong>{tsk.status}</p>
            </div>
          ))}
        </div>

        {/*COMPLETADO*/}
        <div className='shadow w-80 m-3 p-4'>
          {task.
          filter(tsk => tsk.status === "Completada")
          .map(tsk => (
            <div key={tsk.id}>
              <strong>{tsk.title}</strong>
              <p>{tsk.description}</p>
              <p><strong>Prioridad: </strong>{tsk.priority}</p>
              <p><strong>Estado: </strong>{tsk.status}</p>
            </div>
          ))}
        </div>

        {/*EN PROCESO*/}
       <div className='shadow w-80 m-3 p-4'>
          {task.
          filter(tsk => tsk.status === "En proceso")
          .map(tsk => (
            <div key={tsk.id}>
              <strong>{tsk.title}</strong>
              <p>{tsk.description}</p>
              <p><strong>Prioridad: </strong>{tsk.priority}</p>
              <p><strong>Estado: </strong>{tsk.status}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
