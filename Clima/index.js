//Importando as abibliotecas
const express = require("express")
const axios = require("axios")
require("dotenv").config()

//Configuração de servidor
const porta = 3000
const app = express()
// Configurando o servidor para acessar arquivos HTML, CSS e JS
app.use(express.static("public"))
//Rota para buscar o clima de uma cidade
app.get("/api/clima", async (requisicao, resposta) => {
    //Pega o nome da cidade
    const cidade = requisicao.query.cidade
    //Pega a chave API do arquvivo .env
    const chaveAPI = process.env.OPENWEATHER_API_KEY 
    //Realiza a comunicação da API com o site
    try{
        const respostaAPI = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chaveAPI}&units=metric&lang=pt_br`)
        resposta.json(respostaAPI.data)
    }
    catch{
        // Se der errado 
        resposta.status(500).json({ erro: "Não foi possivel buscar o clima" })
    }
})
app.listen(porta, () => {
    console.log(`Servidor rodando em: http://localhost:${porta}`)
})