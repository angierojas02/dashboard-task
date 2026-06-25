import { useEffect, useState } from 'react'
import { Target } from './components/Target'

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


  return (
    <>
      <div className='grid grid-cols-3 w-full'>
        {/*PENDIENTE*/}
        <div>
          {task.
          filter(tsk => tsk.status === "Pendiente")
          .map(tsk => (
            <Target key={tsk.id}
            {...tsk}
            onDelete={deleteTask}
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
              />
            ))}
        </div>

      </div>
    </>
  )
}

export default App
