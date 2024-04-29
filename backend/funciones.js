const { Pool } = require('pg');

// configuracion de credenciales de la base de datos
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin123',
    database: 'likeme',
    allowExitOnIdle: true
})

const getData = async () => {
    const consulta = "SELECT * FROM posts;"
    const { rows } = await pool.query(consulta)
    return rows
}

const postear = async (titulo, url, descripcion) => {
    const id = Math.floor(Math.random() * 9999)
    const query = "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5);"
    const values = [id, titulo, url, descripcion, 0]
    const { rows } = await pool.query(query, values)
    return rows
}

const sumarLike = async (id) => {
    const query = "UPDATE posts SET likes = likes+1 WHERE id = $1;"
    const values = [id]
    const addLike = await pool.query(query, values)
    return addLike
}

const borrarPost = async (id) => {
    const query = "DELETE FROM posts WHERE id = $1;"
    const values = [id]
    const borrarPost = await pool.query(query, values)
    return borrarPost
}
module.exports = { getData, postear, sumarLike, borrarPost }