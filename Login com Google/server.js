require('dotenv').config()

if(!process.env.ID || !process.env.SECRET) {
    console.error("ERRO: As credenciais nao estao configuradas")
    process.exit(1)
}

const express = require("express")
const sessao = require("express-session")
const passport = require("passport")
const Google = require("passport-google-oauth20").Strategy
const mysql = require("mysql2/promise")

const app = express()

app.use(passport.initialize())
app.use(passport.session())

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '08102007',
    database: process.env.DB_NAME || 'login_google_db'
})

async function criartabela () {
    try {
        const conn = await db.getConnection()
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                googleId VARCHAR(255) UNIQUE,
                email VARCHAR(255),
                nome VARCHAR(255),
                data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
        conn.release()
        console.log("Tabela 'usuarios' criada com sucesso.")
    } catch (erro) {
        console.error("Erro ao criar tabela:", erro)
    }
}
criartabela()

// configurar login com google
passport.use(new Google({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
},
async function(token, refresh, perfil, done) {
try {
const conn = await db. getConnection()
const [rows] = await conn. execute(
"SELECT * FROM usuario WHERE googleId = ?",
[perfil.id]
)
if(rows. length == 0) {
await conn. execute (
"INSERT INTO usuario (googleId, email, nome) VALUES (?, ?, ?)",

[perfil.id, perfil. emails[0].value, perfil.displayName]
            )
        }
        conn.release
        return done(null, perfil)
    } catch (erro) {
        return done(erro, null)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.use(express.static("public"))
