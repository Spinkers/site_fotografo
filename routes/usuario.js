const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Ticket")
const Ticket = mongoose.model("tickets")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const {eUser} = require("../helpers/eUser")

/* ROTA QUE REALIZA O REGISTRO DE UM USUÁRIO */
router.post("/registro", (req, res) => {

  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({texto: "Nome inválido"})
  }
  if(!req.body.sobrenome || typeof req.body.sobrenome == undefined || req.body.sobrenome == null){
      erros.push({texto: "Sobrenome inválido"})
  }
  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
      erros.push({texto: "Email inválido"})
  }
  if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
      erros.push({texto: "Senha inválido"})
  }
  if(req.body.senha.length < 6){
      erros.push({texto: "Senha muito curta"})
  }
  if(req.body.senha != req.body.confirmarSenha){
      erros.push({texto: "Senhas não conferem, tente novamente!"})
  }
  if(erros.length > 0){
      res.send({erros: erros})
  }else{
      Usuario.findOne({email: req.body.email}).then((usuario) => {
          if(usuario){
              erros.push({texto: "Email já registrado!"})
              res.send({erros: erros})
          }else{
              const novoUsuario = new Usuario({
                  nome: req.body.nome,
                  sobrenome: req.body.sobrenome,
                  email: req.body.email,
                  senha: req.body.senha
              })

              bcrypt.genSalt(10, (erro, salt) => {
                  bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                      if(erro){
                          erros.push({texto: "Houve um erro interno, entre em contato com o administrador do sistema"})
                          res.send({erros: erros})
                      }

                      novoUsuario.senha = hash
                      novoUsuario.save().then(() => {
                          //req.flash("success_msg", "Usuário criado com sucesso!")
                          //res.redirect("/login")
                          res.send("Ok")
                      }).catch((err) => {
                          erros.push({texto: "Erro ao cadastrar usuário, tente novamente!"})
                          res.send({erros: erros})
                      })
                  })
              })
          }
      }).catch((err) => {
          erros.push({texto: "Houve um erro interno, entre em contato com o administrador!"})
          res.send({erros: erros})
      })
  }
});

router.post("/login", (req, res, next) => {
    console.log(req.body.email, req.body.senha)
    passport.authenticate("local", {
        successRedirect: "/usuarios/painel",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
});

module.exports = router