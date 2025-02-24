// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');/*liberações do servidor, abre portas para permitir a comunicação entre cliente e servidor*/
const corsOpcoes = {
  origin: "http://localhost:3000", /*cliente que fará o acesso*/
  methods: "GET, PUT, POST, DELETE", /*métodos que o cliente pode executar*/
  allowedHeaders: "Content-Type, Authorization", /*autoriza todo tipo de conteúdo*/
  credentials: true
}
const crypto = require('./crypto');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cors(corsOpcoes))


app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar"] })
);

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('usuarios/cadastrar')
})

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.post('/logar', async function(req, res) {
  try {
    const {  name, senha } = req.body;
    console.log(name);
    const cadastro = await usuario.findOne({ where: { nome: name } });

    if (cadastro && crypto.decrypt(cadastro.senha) === senha) {
      const id = 1;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 3000
      });

      return res.cookie('token', token, { httpOnly: true }).json({
        nome: cadastro.nome,
        token: token
      });
      /*return res.json({
        usuario: cadastro.nome,
        token: token
      });*/
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login inválido." });
  }
});

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly: true});
  res.json({
    deslogado:true
  })
})

app.post('/usuarios/cadastrar', async function(req, res){
  try {
    const banco = {
      nome: req.body.nome,
      senha: crypto.encrypt(req.body.senha)
    }
    if(req.body.senha == req.body.confirmar){
      const passwordcrypto = await usuario.create(banco);
      res.redirect('/usuarios/listar')
    }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Ocorreu um erro ao criar o usuário.' });
  }
})

app.get('/usuarios/listar', async function(req, res){
  try {
   var passwordcrypto = await usuario.findAll();
   res.json(passwordcrypto);
 } catch (err) {
   console.error(err);
   res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuário.' });
 }
 })

app.listen(4000, function() {
  console.log('App de Exemplo escutando na porta 4000!')
});