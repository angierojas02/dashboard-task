import express from 'express'
import { tasks } from './task.js'
import crypto from 'crypto'

const app = express()
app.use(express.json())

const PORT = process.env.PORT ?? 1234

app.get('/tasks', (req, res) => {
    res.json(tasks)
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find(tks => tks.id === id)
    if (!task) {
        return res.status(404).json({ mensaje: "ERROR. TAREA NO ENCONTRADA"})
    }
    res.json(task)
})

app.post('/tasks', (req, res) => {
    const { title, description, priority, status } = req.body

    const newtask = {
        id: crypto.randomUUID(),
        title,
        description,
        priority,
        status: "Pendiente"
    }

    tasks.push(newtask)

    res.status(201).json({
        mensaje: "Nueva tarea agregada",
        tarea: newtask
    })
})

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params
    const indice = tasks.findIndex(tsk => tsk.id === id)
    
    if(indice === -1) {
        return res.status(404).json({ mensaje: "NO SE ENCONTRÓ LA TAREA"})
    }

    tasks.splice(indice, 1)
    res.status(200).json({ mensaje: "ELEMENTO BORRADO CON ÉXITO "})
})


app.listen(PORT, () => {
    console.log(`SERVER LISTENING PORT http://localhost:${PORT}`)
})