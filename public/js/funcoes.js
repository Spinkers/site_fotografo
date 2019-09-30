function definirInicio(status){
    if(status){
        document.getElementById('inicial').value = "active"
    }else{
        document.getElementById('inicial').value = ""
    }
}

function transferirSlide(id){
    var elementos = document.getElementById(id+"***").querySelectorAll('*');
    document.getElementById('nomeSlide2').value = elementos[7].innerText;
    document.getElementById('descricaoSlide2').value = elementos[11].innerText;
    document.getElementById('nomeBotaoSlide2').value = elementos[12].value;
    document.getElementById('imagemSlide2').value = elementos[13].value;
    document.getElementById('linkBotaoSlide2').value = elementos[14].value;
    document.getElementById('idSlide').value = id;

    if(elementos[9].innerText == "Inicial"){
        document.getElementById('tornarInicialSlide').checked = true;
        document.getElementById('tornarInicialSlide').disabled = true;
        document.getElementById('inicialSlide').value = "active";
    }else{
        document.getElementById('tornarInicialSlide').checked = false;
        document.getElementById('tornarInicialSlide').disabled = false;
        document.getElementById('inicialSlide').value = "";
    }
}

function alterarInicialSlide(valor){
    if(valor){
        document.getElementById('inicialSlide').value = "active";
    }else{
        document.getElementById('inicialSlide').value = "";
    }
}