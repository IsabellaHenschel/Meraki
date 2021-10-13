jQuery(document).ready(function ($) {

    window.onscroll = function () {
        if (window.pageYOffset > 50) {
            $('#header').addClass("fixar");
        } else {
            $('#header').removeClass("fixar");
        }
    };

    $(function () {

        function exibir_livros() {
            $.ajax({
                url: 'http://localhost:5000/listar_livros',
                method: 'GET',
                dataType: 'json',
                success: listar,
                error: function () {
                    alert("Erro ao ler dados, verifique o backend");
                }
            });

            function listar(livros) {
                $('#corpoTabelaLivros').empty();
                mostrar_conteudo("tabelaLivros");
                for (var i in livros) {
                    lin = '<tr id="linha_'+livros[i].id+'">' +
                        '<td>' + livros[i].titulo + '</td>' +
                        '<td>' + livros[i].autor + '</td>' +
                        '<td>' + livros[i].editora + '</td>' +
                        '<td>' + livros[i].genero + '</td>' +
                        '<td>' + livros[i].isbn + '</td>' +
                        '<td><a href=# id="excluir_' + livros[i].id + '" ' +
                        'class="excluir_livro"><img src="imagens/excluir.png" ' +
                        'alt="Excluir livro" title="Excluir livro"></a>' +
                        '</td>' +
                        '</tr>';

                    $('#corpoTabelaLivros').append(lin)
                }
            };

        };

        function mostrar_conteudo(identificador) {
            $("#tabelaLivros").addClass('invisible');
            $("#" + identificador).removeClass('invisible');
        };

        $(document).on("click", "#linkListarLivros", function () {
            exibir_livros();
        });

        /*$(document).on("click", "#linkInicio", function () {
            mostrar_conteudo("conteudoInicial");
        });*/

        $(document).on("click", "#btIncluirLivro", function () {
            titulo = $("#campoTitulo").val();
            autor = $("#campoAutor").val();
            editora = $("#campoEditora").val();
            genero = $("#campoGenero").val();
            isbn = $("#campoIsbn").val();
            var dados = JSON.stringify({ titulo: titulo, autor: autor, editora: editora, genero: genero, isbn: isbn });

            $.ajax({
                url: 'http://localhost:5000/incluir_livro',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: dados,
                success: livroIncluido,
                error: erroAoIncluir
            });

            function livroIncluido(retorno) {
                if (retorno.resultado == "ok") {
                    alert("Pessoa incluída com sucesso!");

                    /*$('#modalIncluirLivro').modal('show');
                    setTimeout(function () {
                        $('#modalIncluirLivro').modal('hide')
                    }, 2000);*/
                    $("#campoTitulo").val("");
                    $("#campoAutor").val("");
                    $("#campoEditora").val("");
                    $("#campoGenero").val("");
                    $("#campoIsbn").val("");

                } else {
                    alert(retorno.resultado + ":" + retorno.detalhes);
                }
            };

            function erroAoIncluir(retorno) {
                alert("erro ao incluir dados, verifique o backend: ");
            }
        });

        $('#modalIncluirLivro').on('hide.bs.modal', function (e) {
            if (!$("#tabelaLivros").hasClass('invisible')) {
                exibir_livros();
            }
        });

        //mostrar_conteudo("conteudoInicial");

        $(document).on("click", ".excluir_livro", function () {
            var componente_clicado = $(this).attr('id');
            var nome_icone = "excluir_";
            var id_livro = componente_clicado.substring(nome_icone.length);
            $.ajax({
                url: 'http://localhost:5000/excluir_livro/' + id_livro,
                type: 'DELETE',
                dataType: 'json',
                success: livroExcluido,
                error: erroAoExcluir
            });
            function livroExcluido(retorno) {
                if (retorno.resultado == "ok") {
                    $("#linha_" + id_livro).fadeOut(1000);//, function () {
                       // alert("Livro removido com sucesso!");
                    //});
                } else {
                    alert(retorno.resultado + ":" + retorno.detalhes);
                }
            }
            function erroAoExcluir(retorno) {
                alert("erro ao excluir dados, verifique o backend: ");
            }
        });

    });
});
