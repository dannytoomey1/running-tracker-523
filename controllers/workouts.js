const Workout = require('../models/workout');

module.exports = {
    new: newWorkout,
    create,
    index,
    show,
    delete: deleteWorkout,
    update
}

function newWorkout(req, res) {
    res.render('workouts/new', {
        info: "Blank Workout"
    })
}

function create(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.repTimes = {};
    Workout.create(req.body);
    res.redirect(`/workouts/index`);
    });
}

function index(req, res) {
    Workout.find({}, function(err, workouts) {
        res.render('workouts/index', {title: "All Workouts", workouts})
    })
}

function show(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
        console.log(err)
        res.render('workouts/show', {title: 'Workout Info', workout})
    })
}

function deleteWorkout(req, res, next) {
    if (!Workout.findOne(req.params._id).user === req.user) 
        return res.redirect(`/workouts/${req.params._id}`)    
    Workout.deleteOne({_id: req.params.id}, function(err) {
        if(err)
            console.log(err)
        else
            res.redirect('/workouts/index')
    });
}

function update(req, res) {
    if (!Workout.findOne(req.params._id).user === req.user) 
        return res.redirect(`/workouts/${req.params._id}`)    
    Workout.findById(req.params.id, function(err, workout) {
        workout.repTimes.times= req.body.repTimes;
        workout.repTimes.repDistance = workout.repDistance;
        console.log(err)
        
        workout.save(function(err) {
            console.log(err)
            res.redirect(`/workouts/${req.params.id}`)
        }
    )});    
}