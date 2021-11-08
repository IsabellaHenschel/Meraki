from config import *


class Livro(db.Model):
    """Esta classe representa um livro do mundo real, tendo como atributos o id, titulo, autor, editora, genero e isbn.

    Args:
        id (int): ID do livro.
        titulo (str): Título do livro.
        autor (str): Nome do autor que escreveu o livro.
        editora (str): Editora responsável pela edição, divulgação e publicação do livro.
        genero (str): Gênero literário do livro.
        isbn (str): Código utilizado para indentificar um livro.
    """
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200))
    autor = db.Column(db.String(200))
    editora = db.Column(db.String(200))
    genero = db.Column(db.String(200))
    isbn = db.Column(db.String(200))

    def __str__(self):
        """Este método expressa o livro em forma de texto.
        """
        return str(self.id) + "," + \
            self.titulo + ", " + \
            self.autor + ", " + \
            self.editora + ", " + \
            self.genero + ", " + \
            self.isbn

    def json(self):
        """Este método expressa o livro em formato json.
        """
        return {
            "id": self.id,
            "titulo": self.titulo,
            "autor": self.autor,
            "editora": self.editora,
            "genero": self.genero,
            "isbn": self.isbn
        }



class Leitor(db.Model):
    """Esta classe representa um leitor, tendo como atributos o id, nome, livro_id e livro.

    Args:
        id (int): ID da biblioteca.
        nome (str): Nome da biblioteca.
        livro_id (int): ID do livro e atributo de chave estrangeira.
        livro_lido : Atributo de relacionamento, para acesso aos dados via objeto.
    """
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200))
    email = db.Column(db.String(200))
    livro_id = db.Column(db.Integer, db.ForeignKey(Livro.id), nullable=False)
    livro_lido = db.relationship("Livro")

    def __str__(self):
        """Este método expressa as informações do leitor em forma de texto.
        """
        return str(self.id) + "," + \
            self.nome + ", " + \
            self.email + ", " + \
            str(self.livro)

    def json(self):
        """Este método expressa as informações do leitor em formato json.
        """
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "livro_id": self.livro_id,
            "livro": self.livro_lido.json()
        }

class Biblioteca(db.Model):
    """Esta classe representa uma biblioteca do mundo real, tendo como atributos o id, nome, livro_id e livro.

    Args:
        id (int): ID da biblioteca.
        nome (str): Nome da biblioteca.
        livro_id (int): ID do livro e atributo de chave estrangeira.
        livro : Atributo de relacionamento, para acesso aos dados via objeto.
    """
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200))
    livro_id = db.Column(db.Integer, db.ForeignKey(Livro.id), nullable=False)
    livro = db.relationship("Livro")

    def __str__(self):
        """Este método expressa a biblioteca em forma de texto.
        """
        return str(self.id) + "," + \
            self.nome + ", " + \
            str(self.livro)

    def json(self):
        """Este método expressa a biblioteca em formato json.
        """
        return {
            "id": self.id,
            "nome": self.nome,
            "livro_id": self.livro_id,
            "livro": self.livro.json()
        }

if __name__ == "__main__":
    """Teste do programa.
    """

    if os.path.exists(arquivobd):
        """Apaga o arquivo se existir.
        """
        os.remove(arquivobd)

    """Cria as tabelas."""
    db.create_all()


    """Teste da classe Livro."""
    novo_livro = Livro(titulo="Divergente", autor="Veronica Roth", editora="Rocco",
                       genero="Ficção utópica e distópica", isbn="9788579801310")

    db.session.add(novo_livro)
    db.session.commit()
    
    """Exibe o livro no formato json"""
    print(novo_livro.json())


    """Teste da classe Livro."""
    nova_biblioteca = Biblioteca(nome = "Biblioteca 01", livro = novo_livro)

    db.session.add(nova_biblioteca)
    db.session.commit()

    """Exibe a biblioteca no formato json"""
    print(nova_biblioteca.json())


    """Teste da classe Leitor."""
    nova_leitora = Leitor(nome="Maria", email ="maria@hotmail.com", livro_lido = novo_livro)

    db.session.add(nova_leitora)
    db.session.commit()

    """Exibe as informações do leitor no formato json"""
    print(nova_leitora.json())
