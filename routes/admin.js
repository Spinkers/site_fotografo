const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
require("../models/Categoria");
const Categoria = mongoose.model("categorias");
require('../models/Postagem')
const Postagem = mongoose.model("postagens")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Ticket")
const Ticket = mongoose.model("tickets")
const {eAdmin} = require("../helpers/eAdmin")

/* ROTA PRINCIPAL DO ADM (TELA DE OPERAÇÕES)*/
router.get('/', eAdmin, (req, res) => {
    res.render("admin/index");     
});


module.exports = router;