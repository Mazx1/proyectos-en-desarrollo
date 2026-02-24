//importar express
import express, { request, response } from "express"



// crear una instancia de la app
const app = express()


// Middleware

app.use(express.json())
const usuarios = [
    {
        id: 1,
        nombre: "Ana",
    },
    {
        id: 2,
        nombre: "Juan",
    },
];

// especificacion de rutas
app.get("/", (req, res) => {
    res.send("---------------------------hola a todo el mundo estamos en linae----------------------")
})

app.get("/usuarios", (req, res) => {


    res.json(usuarios)
});

app.get("/usuarios/:id", (req, res) => {
    const userId = req.params.id
    const usuario = usuarios.find(user => user.id === userId)
});

app.post("/usuarios", (req, res)=>{
    const nuevoUsuario = {
        ...req.body,
        id: usuarios.length +1
    }
});

app.put("/usuarios/:id", (req, res)=>{
    const usuarioId = parseInt(req,params,id)
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === usuarioId)
    usuario[usuarioIndex] = {
        ...usuarios[usuarioIndex],
        ...req.body
    }

    if(usuarioIndex === -1){
        res.status(404).json({error: "usuario no encontrado"})
    }
    res.json(usuarios[usuarioIndex])
});


app.delete("/usuarios/:id", (req,res)=>{
    const usuarioId = parseInt(req,params,id)
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === usuarioId)

    if(usuarioIndex === -1){
        res.status(404).json({error: "usuario no encontrado"})
    }

    usuarios.splice(usuarioIndex)
    res.status(204)
});
const PORT = 3001
// ponemos a escuchar mi app
app.listen(3001, () => {
    console.log("escuchando en Http://localhost:3001")
});