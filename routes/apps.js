var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    var collection = db.get('coll_app');
    collection.find({}, function(err, apps){
        if (err) throw err;
      	res.json(apps);
    });
});

router.get('/name/:name', function(req, res) {
    var db = req.db;
    var collection = db.get('coll_app');
    collection.findOne({name: req.params.name }, function(err, app){
        if (err) throw err;
      	res.json(app);
    });
});

router.get('/databases', function(req, res) {
    var db = req.db;
    var collection = db.get('coll_dbconfig');
    collection.find({}, function(err, databases){
        if (err) throw err;
      	res.json(databases);
    });
});

router.get('/databases/name/:name', function(req, res) {
    var db = req.db;
    var collection = db.get('coll_dbconfig');
    collection.find({db_name: req.params.name}, function(err, database){
        if (err) throw err;
      	res.json(database);
    });
});

router.get('/databases/type/:type', function(req, res) {
    var db = req.db;
    var collection = db.get('coll_dbconfig');
    collection.find({db_type: req.params.type}, function(err, database){
        if (err) throw err;
      	res.json(database);
    });
});

router.get('/databases', function(req, res) {
    var db = req.db;
    var collection = db.get('coll_dbconfig');
    collection.find({}, function(err, databases){
        if (err) throw err;
      	res.json(databases);
    });
});

router.post('/', function(req, res){
    var db = req.db;
    var collection = db.get('coll_app');
    console.log('Inserting APP: '+req.body.name);
    collection.insert(req.body, function(err, app){
        if (err) throw err;
        res.send(app);
        console.log('Successfully Inserted: '+app.name);
    });
});

router.post('/addapp', function(req, res){
    var db = req.db;
    var collection = db.get('coll_app');
    collection.insert({
        name: req.body.appName,
        api_type: req.body.apiType,
        api_ver: req.body.apiVersion,
        descr: req.body.appDescr,
        version: req.body.appVersion,
        endpoint: req.body.appEndpoint,
        status: req.body.appStatus,
        servicename: req.body.appServiceName,
        created_by: req.body.appCreatedBy,
        created_date: req.body.appCreatedDate,
        last_updated_by: req.body.appLastUpdatedBy,
        last_updated_date: req.body.appLastUpdatedDate,
        messages: [{message: req.body.message}],
        stackato_config: {org: req.body.stackatoOrg,space: req.body.stackatoSpace},
        api_config: {
            query: req.body.apiQuery, 
            db_config: {
                db_type: req.body.apiDbType,
                host: req.body.apiDbHost,
                port: req.body.apiDbPort,
                uname: req.body.apiDbUserName,
                pwd: req.body.apiDbPassword,
                conn_string: req.body.apiDbConnString,
                db_name: req.body.apiDbName,
                schema: req.body.apiDbSchema
            }
        }
    }, function(err, app){
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("appslist");
        }
    });
});


router.put('/name/:name', function(req, res){
    var db = req.db;
    var collection = db.get('coll_app');
    collection.update({
        name: req.params.name
    },
    req.body, function(err, app){
        if (err) throw err;
        res.json(app);
    });
});

/* Directly from UI
router.put('/name/:name', function(req, res){
    var db = req.db;
    var collection = db.get('coll_app');
    collection.update({
        name: req.params.name
    },
    {
        name: req.body.appName,
        api_type: req.body.apiType,
        api_ver: req.body.apiVersion,
        descr: req.body.appDescr,
        version: req.body.appVersion,
        endpoint: req.body.appEndpoint,
        status: req.body.appStatus,
        servicename: req.body.appServiceName,
        created_by: req.body.appCreatedBy,
        created_date: req.body.appCreatedDate,
        last_updated_by: req.body.appLastUpdatedBy,
        last_updated_date: req.body.appLastUpdatedDate,
        messages: [{message: req.body.message}],
        stackato_config: {org: req.body.stackatoOrg,space: req.body.stackatoSpace},
        api_config: {
            query: req.body.apiQuery, 
            db_config: {
                db_type: req.body.apiDbType,
                host: req.body.apiDbHost,
                port: req.body.apiDbPort,
                uname: req.body.apiDbUserName,
                pwd: req.body.apiDbPassword,
                conn_string: req.body.apiDbConnString,
                db_name: req.body.apiDbName,
                schema: req.body.apiDbSchema
            }
        }
    }, function(err, app){
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("appslist");
        }
    });
});
*/

router.delete('/name/:name', function(req, res){
    var db = req.db;
    var collection = db.get('coll_app');
    collection.remove({ name: req.params.name }, function(err, app){
        if (err) throw err;
        res.json(app);
    });
});

module.exports = router;
