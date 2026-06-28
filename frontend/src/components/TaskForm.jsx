import { useState } from "react"

export function TaskForm ({addNewTask}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("Media")

    const handleSubmit = (e) => {
        e.preventDefault()

        const newTask = {
            title,
            description,
            priority
        }

        addNewTask(newTask)
        setTitle("")
        setDescription("")
        setPriority("Media")
}

    return (
        <div>
            <h2>Ingrese una nueva tarea</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="border-2 border-slate-300 rounded-2xl"/>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="" id="" className="border-2 border-slate-300 rounded-2xl"></textarea>
                
                <select onChange={(e) => setPriority(e.target.value)} value={priority} id="status" name="priority">
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                </select>
                <button type="submit">Agregar</button>
            </form>
        </div>
    )
}