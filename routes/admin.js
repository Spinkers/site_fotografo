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
router.get("/painel", eAdmin, (req, res) => {
    res.render("admin/painel")
})

router.get("/novapostagem", eAdmin, (req,res)=> {
    res.render("admin/novapostagem")
})

router.post("/novapostagem", eAdmin, (req,res) => {
    console.log(req.body.titulo, req.body.descricao, req.body.categoria)
    const novaPostagem = new Postagem ({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria
    })
    novaPostagem.save().then(() => {
        console.log("Salvo com sucesso")
        res.send("Ok")
    }).catch((err) => {
        console.log("Não foi possivel salvar" + err)
        res.send("Fail")
    })
})


module.exports = router;