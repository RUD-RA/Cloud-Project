const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config()
const region = process.env.REGION
const key = process.env.KEY 
const skey = process.env.SKEY 

// AWS Configuration
AWS.config.update({region: region, accessKeyId: key, secretAccessKey: skey});
const docClient = new AWS.DynamoDB.DocumentClient();

router.use(bodyParser.json());

// API 
router.post('/register', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    // Check if email already exists
    var params = {
        TableName: 'user-info',
        Key: {
            'email': email
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            res.send({"error": "Could not check user"});
        } else {
            if (data.Item) {
                res.send({"error": "Email already exists"});
            } else {
                // Hash the password
                bcrypt.hash(password, 10, function(err, hash) {
                    if (err) {
                        return res.send({"error": "Could not hash password"});
                    }

                    var paramsWrite = {
                        TableName: 'user-info',
                        Item: {
                            'email': email,
                            'password': hash  
                        }
                    };

                    docClient.put(paramsWrite, function(err, data) {
                        if (err) {
                            res.send({"error": "Could not register user"});
                        } else {
                            res.send({"success": "User registered successfully"});
                        }
                    });
                });
            }
        }
    });
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    // Check if user exists
    var params = {
        TableName: 'user-info',
        Key: {
            'email': email
        }
    };

    docClient.get(params, function(err, data) {
        if (err) {
            res.send({"error": "Could not check user"});
        } else {
            if (data.Item) {
                // Compare the hashed password
                bcrypt.compare(password, data.Item.password, function(err, result) {
                    if (result) {
                        res.send({"success": "User logged in successfully"});
                    } else {
                        res.send({"error": "Invalid password"});
                    }
                });
            } else {
                res.send({"error": "User does not exist"});
            }
        }
    });
});

router.get('/logout',function(res,req) {
    res.send({"success": "Logged out successfull"});
})

module.exports = router;
