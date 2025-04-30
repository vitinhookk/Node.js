document.addEventListener("DOMContentLoaded", () => {
const campoCidade = document. getElementById("cidade")
const botaoBuscar = document. getElementById("buscar")
const nomeCidade = document. getElementById("nome-cidade")
const temperatura = document. getElementById("temperatura")
const umidade = document. getElementById("umidade")
const vento = document. getElementById("vento")
const descricao = document. getElementById("descricao")
// Adicionando evento ao clicar no botao
botaoBuscar. addEventListener("click", buscarClima)
// Funcao que busca o clima
async function buscarClima() {
    const cidade = campoCidade.value.trim()
    if(!cidade) {
        alert("Por favor, Digite uma cidade")
        return
    }
    try {
        const resposta = await fetch(`/api/clima?cidade=${cidade}`)
        const dados = await resposta.json()
        //Atualizando ps dados no site
        nomeCidade.textContent = dados.name
        temperatura.textContent = Math.round(dados.main.temp)
        umidade.textContent = dados.main.humidity
        vento.textContent = Math.round(dados.wind.speed * 3.6)   
        descricao.textContent = dados.weather[0].description
    }
        catch (erro) {
        alert("Não foi possivel buscar essa cidade")
    }
}
})

