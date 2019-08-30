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

/* ROTA QUE LEVA O USUÁRIO PARA TELA DE REGISTRO */
router.get("/registro", (req, res) => {
    res.render("usuarios/registro");
});

module.exports = router