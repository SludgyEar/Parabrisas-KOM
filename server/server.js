import express from 'express';
import {getUsers, getUserById, createUser, loginUser} from './database.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get("/usuarios", async(req, res) => {
    const users = await getUsers();
    res.status(201).send(users);
    // Obtener usuarios
});

app.get("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    const user = await getUserById(id);
    res.status(201).send(user);
    // Obtener usuario por id
});

app.post("/usuarios", async (req, res) => {
    const {nombre, correo, passwd, perfil, status} = req.body;
    const user = await createUser(nombre, correo, passwd, perfil, status);
    res.status(201).send(user);
    // Crear usuario
});

app.post("/login", async (req, res) => {
    const {correo, passwd} = req.body;
    try {
        const user = await loginUser(correo, passwd);
        if (user){
            res.status(201).send(user);
            console.log('Usuario autenticado');
            
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
            console.log('Usuario no autenticado');
            
        }
    } catch (error) {console.log(error);}
    // Autenticar usuario
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(5000, ()=>{
    console.log('Server started on port 5000');
});