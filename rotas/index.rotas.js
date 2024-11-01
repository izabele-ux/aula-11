const express = require('express')
const router = express.Router()
const { Post, Usuario } = require('../db/models')

router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        include: [{
           model: Usuario
        }], raw: true, nest: true
    })

    res.render('pages/posts', {posts: posts, layout: 'layouts/layout-blog.ejs'})

})

module.exports = router

router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [{
            model: Usuario
        }], raw: true, nest: true
    })

    const postResult = posts.map((post) => prepararResultado(post))
    res.render('pages/posts', {posts: postResult, layout: 'layouts/layout-blog.ejs'})
})
router.get('/post/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id, 
        {include: [{model: Usuario}], raw: true, nest: true})
    res.render('pages/post', {post:prepararResultado(post), layout: 'layouts/layout-blog.ejs'})
})