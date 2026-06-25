 
 export function Target ({id, title, description, priority, status, onDelete}) {
    return (
        <div className='shadow w-80 m-4 p-4 rounded-2xl'>
            <strong>{title}</strong>
              <p>{description}</p>
              <p><strong>Prioridad: </strong>{priority}</p>
              <p><strong>Estado: </strong>{status}</p>
              <button onClick={() => onDelete(id)} className="bg-gray-200 rounded-2xl w-fit pl-1.5 pr-1.5 pt-1 pb-1 font-bold text-xs">Eliminar tarea</button>
        </div>
    )
 }