const {reject} = require("async");
const {resolve} = require("path");

/*vamos criar um exemplo que simula buscar dados de um usuario em um banco de dados, 
a busca vai levar 2 segundos*/
function buscarUsuario(id) {
    return new Promise((resolve, reject) => {
        /*iniciamos uma nova promise que pode ter dois resultados:
        resolve, quando tem sucesso
        reject, quando da erro*/
        console.log('Buscando usuário com o ID: ${id}')
        setTimeout(() => { //para simular um atraso de 2s
            const usuario = {id: id, nome: "João"}
            //criamos um objeto representando um usuário encontrado
            if(usuario){
                resolve(usuario)
                //se o usuário existir o resolve é acionado indicando que a tarefa foi concluida com sucesso
            } else{
                reject("Usuário não encontrado")
                //se não existir o reject é acionado indicando que a tarefa falhou
            }
        }, 2000)
})
}