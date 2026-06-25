 
 export function Target ({title, description, priority, status}) {
    return (
        <div className='shadow w-80 m-4 p-4 rounded-2xl'>
            <strong>{title}</strong>
              <p>{description}</p>
              <p><strong>Prioridad: </strong>{priority}</p>
              <p><strong>Estado: </strong>{status}</p>
        </div>
    )
 }