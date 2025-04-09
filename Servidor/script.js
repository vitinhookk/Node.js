// Servidor -> servidor.js

// Importar os módulos necessários
const http = require('http') // módulo para criar servidor HTTP
const fs = require('fs') // módulo para manipulação de arquivos
const caminho = require('path') // módulo para manipulação de caminhos de arquivos

// Definir porta e host
const porta = 3000
const host = 'localhost'

// Criando o servidor
const servidor = http.createServer((requisicao, resposta) => {
    if (requisicao.url === '/') {
        // Verifica se o usuário acessou a página principal
        const caminhoArquivo = caminho.join(__dirname, 'index.html')
        // Lê o arquivo HTML e envia a resposta
        fs.readFile(caminhoArquivo, (erro, conteudo) => {
            if (erro) {
                resposta.writeHead(500)
                resposta.end("Erro ao ler arquivo HTML")
                return
            }
            resposta.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            resposta.end(conteudo)
        })
    } else if (requisicao.url === '/mensagem') {
        // Verifica se o usuário acessou a página de mensagem
        resposta.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        resposta.end('Olá, esta é uma mensagem do servidor HTTP')
    } else {
        // Caso a rota não exista
        resposta.writeHead(404)
        resposta.end("Página não encontrada")
    }
})

// Inicia o servidor
servidor.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}/`)
})