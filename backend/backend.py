from config import *
from modelo import Livro
from modelo import Biblioteca


@app.route("/")
def padrao():
    return "Backend operante"

@app.route("/listar_livros")
def listar_livros():
    livros = db.session.query(Livro).all()
    retorno = []
    for l in livros:
        retorno.append(l.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

'''
@app.route("/listar_bibliotecas")
def listar_bibliotecas():
    bibliotecas = db.session.query(Biblioteca).all()
    retorno = []
    for b in bibliotecas:
        retorno.append(b.json())
    resposta = jsonify(retorno)
    return resposta'''

@app.route("/incluir_livro", methods=['post'])
def incluir_livro():
    resposta = jsonify({"resultado:": "ok", "detalhes": "ok"})
    dados = request.get_json()
    try: 
        nova = Livro(**dados)
        db.session.add(nova)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug = True)
