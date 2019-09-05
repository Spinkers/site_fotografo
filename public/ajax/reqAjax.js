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

  $('#formPostagem').submit(function(event) {
    event.preventDefault();
    let titulo = $('#titulo').val()
    let descricao = $('#descricao').val()
    let categoria = $('#categoria').val()
    let linkImagem = $('#linkImagem').val()

    console.log(titulo);
    console.log(descricao);
    console.log(categoria);
    console.log(linkImagem);


    $.ajax({
      url:'/admin/novapostagem',
      method:'post',
      data: {
        titulo: titulo,
        descricao: descricao,
        categoria: categoria,
        linkImagem: linkImagem
      },
      success: function(res) {
          if(res != "Ok"){
            console.log(res)
            var templateSource   =  `<div class="alert alert-danger">"Não foi possível cadastrar uma nova postagem!"</div>`;
            
            template = Handlebars.compile(templateSource),
  
            finalHTML = template(res);
  
            $('#mostrarErros').html(finalHTML);
  
        }else{
          console.log(res)

          var templateSource   =  `<div class="alert alert-success">"Postagem cadastrada com sucesso!"</div>`;

          template = Handlebars.compile(templateSource),

          finalHTML = template(res);

          $('#mostrarErros').html(finalHTML);

          $('#titulo').val("");
          $('#descricao').val("");
          $('#linkImagem').val("");
        }
      }
    })
  })

  //////////////////////////////

  $('#formCategoria').submit(function(event) {
    event.preventDefault();
    let titulo = $('#titulo').val()

    console.log(titulo);

    $.ajax({
      url:'/admin/novacategoria',
      method:'post',
      data: {
        titulo: titulo
      },
      success: function(res) {
          if(res != "Ok"){
            console.log(res)
            var templateSource   =  `<div class="alert alert-danger">"Não foi possível cadastrar uma nova categoria!"</div>`;
            
            template = Handlebars.compile(templateSource),
  
            finalHTML = template(res);
  
            $('#mostrarErros').html(finalHTML);
  
        }else{
          console.log(res)

          var templateSource   =  `<div class="alert alert-success">"Categoria cadastrada com sucesso!"</div>`;

          template = Handlebars.compile(templateSource),

          finalHTML = template(res);

          $('#mostrarErros').html(finalHTML);

          $('#titulo').val("");
        }
      }
    })
  })

  //////////////////////////////

  $('#formEditarPostagem').submit(function(event) {
    event.preventDefault();
    let id = $('#id2').val()
    let titulo = $('#titulo2').val()
    let descricao = $('#descricao2').val()
    let linkImagem = $('#linkImagem2').val()
    let categoria = $('#categoria2').val()

    console.log(titulo);

    $.ajax({
      url:'/admin/editarpostagem',
      method:'post',
      data: {
        id: id,
        titulo: titulo,
        descricao: descricao,
        linkImagem: linkImagem,
        categoria: categoria
      },
      success: function(res) {
          if(res != "Ok"){
            console.log(res)
            var templateSource   =  `<div class="alert alert-danger">"Não foi possível salvar alterações!"</div>`;
            
            template = Handlebars.compile(templateSource),
  
            finalHTML = template(res);
  
            $('#mostrarErros').html(finalHTML);
  
        }else{
          console.log(res)

          var templateSource   =  `<div class="alert alert-success">"Alterações salvas com sucesso!"</div>`;

          template = Handlebars.compile(templateSource),

          finalHTML = template(res);

          $('#mostrarErros').html(finalHTML);

        }
      }
    })
  })

  //////////////////////////////
