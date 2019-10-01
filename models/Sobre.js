const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Sobre = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    linkImagem: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("sobres", Sobre);