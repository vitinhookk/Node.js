const express = require("express")
const mysql = require("mysql2")
const bcrypt = require("bcryptjs")
const session = require("express-session")
const bodyParser = require("body-parser")
const path = require("path")

const app = express()
const porta = 3000

const banco = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "08102007",
    database: "sistema_login"
})

banco.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar ao mysql: ", erro)
    return;
    }
    
})

app.get("/", (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname,"public", "index.html"))
})
app.get("/login", (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname,"public", "login.html"))
})
app.get("/cadastro", (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname,"public", "cadastro.html"))
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(session({
    secret: 'segredo',
    resave: true,
    saveUninitialized: true,
}))


app.post("/cadastro", async (requisicao, resposta) => {
    const { nome, senha } = requisicao.body
    const senhaHash = await bcrypt.hash(senha, 10)

    banco.query("INSERT INTO usuario (nome, senha) VALUES (?, ?)", [nome, senhaHash], (erro, resultado) => {
        if (erro) {
            console.error("Erro ao cadastrar usuário", erro)
            resposta.status(500).send("Erro ao cadastrar usuário")
            return;
        }
        resposta.redirect("/login")
    })
}
)


app.post('/login', async (requisicao, resposta) => {
    const{nome,senha} = requisicao.body
    banco.query("select * from usuario where nome = ?", [nome],
        async(erro, resultado ) => {
            if(erro){
                console.error ("Erro ao fazer login", erro)
                resposta.status(500).send("erro ao fazer login")
                return;
            }
            if (resultado.length == 0){
                resposta.status(401).send("usuario não encontrado")
                return;
            }
            const usuario = resultado [0]
            const senhaValida = await bcrypt.compare(senha, usuario.senha)
            if (senhaValida){
                requisicao.session.logado = true 
                requisicao.session.none = nome
                resposta.redirect("/painel")
            }
            else {
                resposta.statuus(401).send("senha incorreta")
            }
            
        }
    )
})

app.get("/painel", (requisicao, resposta) => {
    if (requisicao.session.logado) {
        resposta.sendFile(path.join(__dirname,"public", "painel.html"))
    } else {
        resposta.redirect("/login")
    }
})

app.get("/sair", (requisicao, resposta) => {
    requisicao.session.destroy()
    resposta.redirect("/login")
})
app.listen(porta, () => {
    console.log(`Servidor rodando na porta http://localhost:${porta}`)
})
