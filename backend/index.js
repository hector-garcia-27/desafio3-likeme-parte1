const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express()

// Levantamiento del servidor
app.listen(3000, () => console.log("servidor escuchando el puerto 3000"))

// configuracion de credenciales de la base de datos
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin123',
    database: 'likeme',
    allowExitOnIdle: true
})

//middleware
app.use(express.json())
//middleware cors para dejar que se hagan consultas cruzadas de diferentes puertos
app.use(cors())


//rutas y consultas

app.get("/posts", async (req, res) => {
    try {
        const query = "SELECT * FROM posts;"
        const { rows } = await pool.query(query)
        console.log(rows)
        res.json(rows)
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body
        const id = Math.floor(Math.random() * 9999)
        const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5)"
        const values = [id, titulo, url, descripcion, 0]
        const { rows } = await pool.query(query, values)
        console.log(rows)
        res.json("Post agregado con exito")
    } catch (error) {
        console.log("Hay un error ", error.message)
    }
})