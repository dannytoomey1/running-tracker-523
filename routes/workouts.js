var express = require('express');
var router = express.Router();
const workoutsCtrl = require('../controllers/workouts')

router.get('/index', workoutsCtrl.index)
router.get('/new', workoutsCtrl.new)
router.get('/:id', workoutsCtrl.show)
router.post('/', workoutsCtrl.create)
router.delete('/:id', workoutsCtrl.delete)
router.put('/:id', workoutsCtrl.update)

module.exports = router;