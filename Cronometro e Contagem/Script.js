const guias = document.querySelectorAll(".guia-btn");
const conteudos = document.querySelectorAll(".conteudo-guia")

guias.forEach(guia => {
  guia.addEventListener("click", () => {
    guias.forEach(g => g.classList.remove("ativo"))
    guia.classList.add("ativo");
    //adiciona a classe ativo na guia clicada

    // esconde o conteúdo
    conteudos.forEach(conteudo => conteudo.style.display = "none")
    // mostrar o conteúdo da guia selecionada
    const guiaID = guia.getAttribute("data-guia");
    document.getElementById(`guia-${guiaID}`).style.display = "block"
  });
});