function transferirDados(id){
    var elementos = document.getElementById(id+"***").querySelectorAll('*');

    document.getElementById('linkImagem2').value = elementos[0].value;
    document.getElementById('titulo2').value = elementos[3].innerHTML;
    document.getElementById('descricao2').value = elementos[4].innerHTML;
    document.getElementById('id2').value = id;
}

function transferirIdMensagem(id){
    document.getElementById('idMensagem2').value = id;
}