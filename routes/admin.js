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
    Categoria.find().then((categoria) => {
        res.render("admin/novapostagem", {categoria: categoria})
    })
})

router.post("/novapostagem", eAdmin, (req,res) => {
    const novaPostagem = new Postagem ({
        titulo: req.body.titulo,
        linkImagem: req.body.linkImagem,
        descricao: req.body.descricao,
        categoria: req.body.categoria
    })
    novaPostagem.save().then(() => {
        res.send("Ok")
    }).catch((err) => {
        res.send("Fail")
    })
})

router.get("/novacategoria", eAdmin, (req,res) => {
    res.render("admin/novacategoria")
})

router.post("/novacategoria", eAdmin, (req,res) => {
    const novaCategoria = new Categoria({
        nome: req.body.titulo
    })
    novaCategoria.save().then(() => {
        console.log("Categoria salva com sucesso!")
        res.send("Ok")
    }).catch((err) => {
        console.log("Não foi possivel salvar a categoria" + err)
        res.send("Fail")
    })
})

router.get("/editarpostagem", eAdmin, (req,res) => {
    Postagem.find().populate("categoria").then((postagem) => {
        Categoria.find().then((categoria) => {
            res.render("admin/editarpostagem", {postagem: postagem, categoria: categoria})
        })
    })
})

router.post("/editarpostagem", eAdmin, (req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        postagem.titulo = req.body.titulo,
        postagem.descricao = req.body.descricao,
        postagem.linkImagem = req.body.linkImagem,
        postagem.categoria = req.body.categoria

        postagem.save().then(() => {
            res.send("Ok")
        }).catch((err) => {
            res.send("Fail")
        })
    }).catch((err) => {
        res.send("417")
    })
})

module.exports = router;