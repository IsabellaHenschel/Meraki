jQuery(document).ready(function ($) {

    window.onscroll = function () {
        if (window.pageYOffset > 50) {
            $('#header').addClass("fixar");
        } else {
            $('#header').removeClass("fixar");
        }
    };

    $(function () {
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

    });
});
