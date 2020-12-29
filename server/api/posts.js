const {Router} = require("express")
const { v4 } = require("uuid")
const Post = require('../models/post')
const router = Router()
router.get("/", async (_req, res) => {
    try {
        const posts = await Post.findAll()
        res.status(200).json(posts)
    } catch (_err) {
        res.status(500).end()
    }
})
router.post("/", async (req, res) => {
    try {
        const {author, text} = req.body
        const post = await Post.create({
            id: v4(), author, text
        })
        res.status(201).json(post)
    } catch (_err) {
        res.status(500).end()
    }
})

module.exports = router
