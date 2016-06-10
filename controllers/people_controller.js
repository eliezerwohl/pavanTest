var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {
  models.Person.findAll({
    include: [ models.Task ]
  }).then(function(people) {
    res.render('people/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      people: people
    });
  });
});

router.post("/delete/:id/:which", function(req, res){
 var id = req.params.id;
 var which = req.parms.which;
  if (which === "task"){
    models.Task.destroy({
      where: {"id":id
         // criteria
      }
    }).then(function(){
      res.redirect("/people");
    })
  }
  else if ( which === "person"){
    models.Person.destroy({
      where: {"id":id
          // criteria
      }
    }).then(function(){
      res.redirect("/people");
    });
  }
});

router.post('/create', function(req, res) {
  models.Person.create({
    name: req.body.name
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
