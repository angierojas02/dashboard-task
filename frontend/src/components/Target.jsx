 const colorsStatus = {
        "Completada": "from-green-400 to-green-500",
        "Pendiente": "from-red-400 to-red-500",
        "En proceso": "from-yellow-400 to-yellow-500"
    }

 export function Target ({id, title, description, status, onDelete}) {
    

    return (
        <div className='shadow md:max-w-80 rounded-2xl max-w-72 m-2.5 bg-slate-300 overflow-hidden'>
            <div className="p-3 flex flex-col gap-1">
                <h3 className="text-base mb-1 font-bold">{title.toUpperCase()}</h3>
                <p className="text-sm mb-1">{description}</p>
                <p className={`pl-1 pr-1.5 w-fit text-white rounded-full text-centers font-semibold border-2 border-transparent bg-clip-border bg-linear-to-r ${colorsStatus[status]}`}>{status}</p>
            </div>
            <div className="border-t-2 border-slate-600/50 rounded-b-2xl flex justify-between">
                <button onClick={() => onDelete(id)} className="font-semibold flex-1 bg-slate-500/80 p-1">Eliminar</button>
                <button className="font-semibold flex-1 bg-slate-400">Editar</button>
            </div>
              
        </div>
    )
 }