$('#formRegister').submit(function(event) {
    event.preventDefault();
    console.log("Aqui")
    let nome = $('#firstName').val()
    let sobrenome = $('#lastName').val()
    let email = $('#inputEmail').val()
    let senha = $('#inputPassword').val()
    let confirmarSenha = $('#confirmPassword').val()

    $.ajax({
      url:'/usuarios/registro',
      method:'post',
      data: {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
        confirmarSenha: confirmarSenha
      },
      success: function(res) {
          if(res != "Ok"){
            var templateSource   = 
            `{{#each erros}}
                <div class="alert alert-danger">{{texto}}</div>
            {{else}}
            
            {{/each}}`;
            
            template = Handlebars.compile(templateSource),
  
            finalHTML = template(res);
  
            $('#mostrarErros').html(finalHTML);
  
            $('#inputPassword').val("");
            $('#confirmPassword').val("");
        }else{
            location.href = '/login';
        }
      }
    })
  })

  //////////////////////////////
