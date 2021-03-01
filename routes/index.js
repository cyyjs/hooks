const express = require('express')
const router = express.Router()
// const Hooks = require('../lib/hooks')
const Notice = require('../lib/notice')

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Hooks' })
})

router.post('/notice/:type', Notice)
// router.post('/:type', Hooks)

module.exports = router
