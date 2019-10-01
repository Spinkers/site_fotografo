const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Mensagem = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    assunto: {
        type: String,
        required: true
    },
    mensagem: {
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("mensagens", Mensagem);