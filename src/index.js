const express = require('express');
const UserApi = require('./api/user');
const PostagemApi = require('./api/postagem');
const database = require('./config/database');

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ response: 'Hello World!' });
})

const userApi = new UserApi();
const postagemApi = new PostagemApi();

app.get('/users', userApi.listarUsuario);
app.post('/users', userApi.criarUsuario);
app.post('/login', userApi.validarToken);

app.use(userApi.validarToken);

app.put('/users/:id', userApi.alterarUsuario);
app.delete('/users/:id', userApi.deletarUsuario);

app.get('/postagens', postagemApi.listarPostagem);
app.post('/postagens', postagemApi.criarPostagem);
app.put('/postagens/:id', postagemApi.alterarPostagem);
app.delete('/postagens/:id', postagemApi.deletarPostagem);

database.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });
