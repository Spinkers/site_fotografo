const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eAdmin: {
        type: Number,
        default: 0
    },
    CPF: {
        type: String,
        default: ""
    },
    endereco: {
        type: String,
        default: ""
    },
    CEP: {
        type: String,
        default: ""
    },
    nomeBanco: {
        type: String,
        default: ""
    },
    numeroConta: {
        type: String,
        default: ""
    },
    numeroAgencia: {
        type: String,
        default: ""
    },
    pagou: {
        type: Boolean,
        default: false
    },
    operacaoAberta: {
        type: Boolean,
        default: false
    },
    pendencia: {
        type: Boolean,
        default: false
    },
    log: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0]
    },
    mensagem: {
        type: Array,
        default: ["", "", "", ""]
    },
    primeiraVez: {
        type: Boolean,
        default: true
    },
    perfilCompleto: {
        type: Boolean,
        default: false
    },
    data: {
        type: Date,
        default: Date.now()
    },
    senha: {
        type: String,
        required: true
    }
})

mongoose.model("usuarios", Usuario)

