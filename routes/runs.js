var express = require('express');
var router = express.Router();
const runsCtrl = require('../controllers/runs')


router.get('/index', runsCtrl.index)
router.get('/new', runsCtrl.new)
router.get('/:id', runsCtrl.show)
router.post('/', runsCtrl.create)
router.delete('/:id', runsCtrl.delete)
router.put('/:id', runsCtrl.update)

module.exports = router;