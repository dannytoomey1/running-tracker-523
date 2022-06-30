const Run = require('../models/run');

module.exports = {
    new: newRun,
    create,
    index,
    show,
    delete: deleteRun,
    update
}

function newRun(req, res) {
    res.render('runs/new', {
        info: "Blank Run"
    })
}

function create(req, res) {
    Run.findById(req.params.id, function(err, run) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    Run.create(req.body);
    res.redirect(`/runs/index`);
    });
}

function index(req, res) {
    Run.find({}, function(err, runs) {
        res.render('runs/index', {title: "All Runs", runs})
    })
}

function show(req, res) {
    Run.findById(req.params.id, function(err, run) {
        console.log(err)
        res.render('runs/show', {title: 'Run Info', run})
    })
}

function deleteRun(req, res, next) {
    if (!Run.findOne(req.params._id).user === req.user) 
        return res.redirect(`/runs/${req.params._id}`)    
    Run.deleteOne({_id: req.params.id}, function(err) {
        if(err)
            console.log(err)
        else
            res.redirect('/runs/index')
    });
}

function update(req, res) {
    if (!Run.findOne(req.params._id).user === req.user) 
        return res.redirect(`/runs/${req.params._id}`)    
    Run.findById(req.params.id, function(err, run) {
        console.log(run)
        console.log(req.body)
        console.log(err)
            for (let x in req.body) {
                run[x] = req.body[x];
            }
            run.save(function(err) {
                res.redirect(`/runs/${req.params.id}`)
            }
        )});    
}