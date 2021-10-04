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
                $('#corpoTabelaLivross').empty();
                mostrar_conteudo("tabelaLivross");
                for (var i in livros) {
                    lin = '<tr>' +
                        '<td>' + livros[i].titulo + '</td>' +
                        '<td>' + livros[i].autor + '</td>' +
                        '<td>' + livros[i].editora + '</td>' +
                        '<td>' + livros[i].genero + '</td>' +
                        '<td>' + livros[i].isbn + '</td>' +
                        '</tr>';

                    $('#corpoTabelaLivros').append(lin)
                }
            };

        };

        function mostrar_conteudo(identificador) {
            $("#tabelaLivros").addClass('invisible');
            $("#conteudoInicial").addClass('invisible');
            $("#" + identificador).removeClass('invisible');
        };

        $(document).on("click", "#linkListarLivros", function () {
            exibir_livros();
        });

        $(document).on("click", "#linkInicio", function () {
            mostrar_conteudo("conteudoInicial");
        });

        $(document).on("click", "#btIncluirLivro", function () {
            titulo = $("#campoTitulo").val();
            autor = $("#campoAutor").val();
            editora = $("#campoEditora").val();
            genero = $("#campoGenero").val();
            isbn = $("#campoIsbn").val();
            var dados = JSON.stringify({ titulo: titulo, autor: autor, editora: editora, genero: genero, isbn: isbn });

            $.ajax({
                url: 'http://localhost:5000/incluir_livros',
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

        mostrar_conteudo("conteudoInicial");

    });
});
