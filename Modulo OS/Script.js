// PASTA NODE -> PASTA MODULO OS -> sCRIPT.JS
// Importa o modulo os
const os = require('os')

console.log("Sistema Operacional: ", os.platform())
console.log("Arquitetura: ", os.arch())
console.log("Memoria livre: ", os.freemem(), "bytes")
console.log("Memoria total: ", os.totalmem(), "bytes")