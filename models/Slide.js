const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Slide = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    nomeBotao: {
        type: String,
        required: true
    },
    linkBotao: {
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        default: true
    },
    inicial: {
        type: String,
        default: ""
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("slides", Slide);