//Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
//Carregando rotas
const admin = require('./routes/admin');
const usuarios = require("./routes/usuario")
//Carregando modulos
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")
require("./models/Slide")
const Slide = mongoose.model("slides")
//Carregando configurações de banco
const passport = require("passport")
require("./config/auth")(passport)
const db = require("./config/db")

//Configurações
    //Sessão
    app.use(session({
        secret: "adlskj654x",
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash());
    //Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        res.locals.user = req.user || null;
        next();
    });
    //Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars');
    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(db.mongoURI).then(() => {
        console.log("Conectado ao mongo!");
    }).catch((err) => {
        console.log("Erro ao se conectar: " + err);
    });
    //Public
    app.use(express.static(path.join(__dirname, "public")));

//Rotas

//Rota raíz
app.get('/', (req, res) => {
    Slide.find({ativo: true}).then((slide) => {
        Postagem.find().then((postagem) => {
            res.render("index", {slide: slide, postagem: postagem})
        })
    })
})

app.get('/sobre', (req, res) => {
    res.render('sobre')
})

//Rota de login
app.get('/login', (req, res) => {
    res.render("login")
})

//Rota de registro
app.get('/register', (req, res) => {
    res.render("register")
})

//Demais rotas
app.use('/admin', admin);
app.use("/usuarios", usuarios);

//Configuração de porta
const PORT = process.env.PORT || 8286
app.listen(PORT, () => {
    console.log("Servidor rodando!");
});