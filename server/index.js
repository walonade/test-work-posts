const express = require("express")
require("dotenv").config()
const { join } = require("path")
const { PORT, HOST } = require("./keys")
const PostApi = require("./api/posts")
const sequelize = require("./utils/database.js")
const app = express()
app.use(express.static(join(__dirname, "../dist")))
app.get("/", (_req, res) => res.sendFile(join(__dirname, "../dist", "index.html")))
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, Authorization"
    )
    res.header("Access-Control-Allow-Credentials", "true")
    next()
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api/posts", PostApi)
;(async() => {
    try {
        await sequelize.sync({logging: false})
        app.listen(PORT, HOST, error => {
            if(error) throw new Error(error)
            console.log(`> Ready on http://${HOST}:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
})()