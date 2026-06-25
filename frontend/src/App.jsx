import { useEffect, useState } from 'react'
import { Target } from './components/Target'

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
        <div>
          {task.
          filter(tsk => tsk.status === "Pendiente")
          .map(tsk => (
            <Target key={tsk.id}
            {...tsk}
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
              />
            ))}
        </div>

      </div>
    </>
  )
}

export default App
