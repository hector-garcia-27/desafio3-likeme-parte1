const express = require('express');
const cors = require('cors');
const { getData, postear, sumarLike, borrarPost } = require('./funciones.js')
const app = express()


// Levantamiento del servidor
app.listen(3000, () => console.log("servidor escuchando el puerto 3000"))

//middleware
app.use(express.json())
//middleware cors para dejar que se hagan consultas cruzadas de diferentes puertos
app.use(cors())


//rutas y consultas

app.get("/posts", async (req, res) => {
    try {
        const data = await getData()
        res.json(data)
    } catch (error) {
        res.status(error.code).json(error.message)
    }
})

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body
        const post = await postear(titulo, url, descripcion)
        res.json("Post agregado con exito")
    } catch (error) {
        res.status(error.code).json(error.message)
    }
})

app.put("/posts/like/:id", async (req, res) => {
    try {
        const { id } = req.params
        const addLike = await sumarLike(id)
        if (addLike.rowCount === 0) {
            throw {
                code: 404,
                message: `id ${id} no encontrado`
            }
        }
        res.send("like agregado")
    } catch (error) {
        res.status(error.code).json(error.message)
    }
})

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params
        const borrar = await borrarPost(id)
        if (borrar.rowCount === 0) {
            throw {
                code: 404,
                message: `id ${id} no encontrado`
            }
        }
        res.json(`el post con id ${id}, fue borrado con exito`)
    } catch (error) {
        res.status(error.code).json(error.message)
    }
})