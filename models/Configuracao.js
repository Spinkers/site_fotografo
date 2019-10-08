const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Configuracao = new Schema({
    limite: {
        type: Number,
        required: true
    }
})

mongoose.model("configuracoes", Configuracao);