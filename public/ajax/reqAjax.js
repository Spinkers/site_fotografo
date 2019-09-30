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

  $('#formSlide').submit(function(event) {
    event.preventDefault();
    let titulo = $('#tituloSlide').val()
    let imagem = $('#imagemSlide').val()
    let nomeBotao = $('#nomeBotaoSlide').val()
    let linkBotao = $('#linkBotaoSlide').val()
    let descricao = $('#descricaoSlide').val()
  
    $.ajax({
      url:'/admin/adicionarSlide',
      method:'post',
      data: {
        titulo: titulo,
        imagem: imagem,
        nomeBotao: nomeBotao,
        linkBotao: linkBotao,
        descricao: descricao
      },
      success: function(res) {
        var dados = JSON.stringify(res.modulo);
            var templateSource   = 
            `{{#each slide}}
            <div class="card mb-3" id="{{_id}}***">
              <div class="row no-gutters">
                <div class="col-md-4"><img src="{{imagem}}" class="card-img"></div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-8"><h5 class="card-title">{{titulo}}</h5></div>
                          <div class="col-4">
                            <div style="text-align: right">
                              {{#if inicial}}
                              <span class="badge badge-success">Inicial</span>
                              {{else}}
                              <div></div>
                              {{/if}}
                            </div>
                          </div>
                        </div>
  
                  <p class="card-text">{{descricao}}</p>
                  <input type="hidden" id="textoBotao" value="{{nomeBotao}}">
                  <input type="hidden" id="imagemBotao" value="{{imagem}}">
                  <input type="hidden" id="linkBotao" value="{{linkBotao}}">
                  <div class="row">
                    <div class="col-8">
                      <p class="card-text"><small class="text-muted">{{data}}</small></p>
                    </div>
                    <div class="col-4">
                      <div style="text-align: right">
                        <button class="btn btn-warning" id="{{_id}}" onclick="transferirSlide(this.id)" data-toggle="modal" data-target="#modalEdit"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger"><i class="fas fa-trash"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {{/each}}`;
  
            
            template = Handlebars.compile(templateSource),
  
            finalHTML = template(res);
  
            $('#listaSlides').html(finalHTML);
  
            $('#toast-place').append(`
              <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
                <div class="toast-header">
                  <strong class="mr-auto">Sucesso!</strong>
                  <small>Toast</small>
                  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="toast-body">
                  Slide adicionado com sucesso!
                </div>
              </div>
            `);
  
            $('.toast').toast('show');
            $('.toast').on('hidden.bs.toast', e => {
              $(e.currentTarget).remove();
            });
  
            $('#tituloSlide').val("");
            $('#imagemSlide').val("");
            $('#nomeBotaoSlide').val("");
            $('#linkBotaoSlide').val("");
            $('#descricaoSlide').val("");
  
      }
    })
  })
  
  ///////////////////////////////////////