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
require("../models/Slide")
const Slide = mongoose.model("slides")
require("../models/Sobre")
const Sobre = mongoose.model("sobres")
const {eAdmin} = require("../helpers/eAdmin")
require("../models/Mensagem")
const Mensagem = mongoose.model("mensagens")

/* ROTA PRINCIPAL DO ADM (TELA DE OPERAÇÕES)*/
router.get("/painel", eAdmin, (req, res) => {
    Mensagem.count({ ativo: true}, function( err, countMensagens){
        Postagem.count({}, function( err, countPostagens){
            res.render("admin/painel", {countMensagens: countMensagens, countPostagens: countPostagens})
        })
    })
})

router.get("/customizar", eAdmin, (req, res) => {
    Slide.find().then((slide) => {
        res.render("admin/customizar", {slide: slide})
    })
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

router.post('/adicionarSlide', eAdmin, (req, res) => {
    const novoSlide = new Slide({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        imagem: req.body.imagem,
        nomeBotao: req.body.nomeBotao,
        linkBotao: req.body.linkBotao,
        inicial: req.body.inicial
    })

    novoSlide.save().then(() => {
        Slide.find().then((slide) => {
            res.send({slide: slide});
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao adicionar o slide, tente novamente!")
        console.log("Erro: " + err)
        res.redirect("/admin/customizar")
    })
});

router.post('/alterarSlide', eAdmin, (req, res) => {
    Slide.findOne({_id: req.body.idSlide}).then((slide) => {
        slide.titulo = req.body.nomeSlide2,
        slide.descricao = req.body.descricaoSlide2,
        slide.imagem = req.body.imagemSlide2,
        slide.nomeBotao = req.body.nomeBotaoSlide2,
        slide.linkBotao = req.body.linkBotaoSlide2

        if(req.body.inicialSlide == "active"){
            if(slide.inicial == ""){
                Slide.findOne({inicial: "active"}).then((slide) => {
                    slide.inicial = ""
                    slide.save();
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao salvar as alterações")
                    console.log("Erro: " + err)
                    res.redirect("/admin/customizar")
                })
                slide.inicial = "active"
            }
        }else{
            slide.inicial = ""
        }

        slide.save().then(() => {
            req.flash("success_msg", "Alterações salvas com sucesso!")
            res.redirect('/admin/customizar');            
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            console.log("Erro: " + err)
            res.redirect("/admin/customizar")
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar as alterações")
        console.log("Erro: " + err)
        res.redirect("/admin/customizar")
    })
});

router.get('/editarSobre', eAdmin, (req,res) => {
    Sobre.findOne().then((sobre) => {
        res.render('admin/editarSobre', {sobre: sobre})
    })
})

router.post('/editarSobre', eAdmin, (req,res) => {
    Sobre.findOne().then((sobre) => {
        sobre.titulo = req.body.titulo,
        sobre.descricao = req.body.descricao,
        sobre.linkImagem = req.body.imagem

        sobre.save().then(() => {
            req.flash("success_msg", "Alterações salvas com sucesso!")
            res.redirect('/admin/editarSobre'); 
        }).catch((err) => {
            req.flash("error_msg", "As alterações não foram salvas, tente novamente!")
            res.redirect('/admin/editarSobre')
        })
    }).catch((err) => {
        const novoSobre = new Sobre({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            linkImagem: req.body.imagem
        })
    
        novoSobre.save().then(() => {
            Sobre.find().then((sobre) => {
                req.flash("success_msg", "Alterações salvas com sucesso!")
                res.redirect('/admin/editarSobre'); 
            })
        }).catch((err) => {
            req.flash("error_msg", "As alterações não foram salvas, tente novamente!")
            res.redirect('/admin/editarSobre')
        })
    })
})

router.get("/ouvidoria", eAdmin, (req,res) => {
    Mensagem.find().then((mensagem) => {
        res.render("admin/ouvidoria", {mensagem: mensagem})
    })
})

router.post("/arquivar", eAdmin, (req,res) => {
    Mensagem.findOne({ _id: req.body.idMensagem }).then((mensagem) => {
        mensagem.ativo = false;

        mensagem.save().then(() => {
            req.flash("success_msg", "Arquivado com sucesso!");
            res.redirect('/admin/ouvidoria');
        }).catch((err) => {
            res.flash("error_msg","Erro interno")
            res.redirect('/admin/arquivar')
        })
    })
})

router.post("/excluir", eAdmin, (req,res) => {
    Mensagem.remove({_id: req.body.idMensagem2}).then(() => {
        req.flash("success_msg", "Mensagem excluída com sucesso!")
        res.redirect("/admin/ouvidoria")
    }).catch((err) => {
        req.flash("error_msg", "Não foi possível excluír a menssagem.")
        res.redirect("/admin/ouvidoria")
    })
})

module.exports = router;