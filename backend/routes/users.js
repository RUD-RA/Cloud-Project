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
            res.status(422).json({
                success:false,
                message:"Error occured during the process"
            })
        } else {
            if (data.Item) {
                res.status(422).json({
                    success:false,
                    message:"This email already exits"
                })
            } else {
                // Hash the password
                bcrypt.hash(password, 10, function(err, hash) {
                    if (err) {
                        res.status(422).json({
                            success:false,
                            message:"Error occured during the process"
                        })
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
                            res.status(422).json({
                                success:false,
                                message:"Error occured during the process"
                            })
                        } else {
                            res.status(201).json({
                                success:true,
                                currentUser:paramsWrite.Item.email,
                                message:"Registration complete"
                            })
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
            res.status(422).json({
                success:false,
                message:"Error occured during the process"
            })
        } else {
            if (data.Item) {
                // Compare the hashed password
                bcrypt.compare(password, data.Item.password, function(err, result) {
                    if (result) {
                        res.status(201).json({
                            success:true,
                            currentUser:params.Key.email,
                            message:"login complete"
                        })
                    } else {
                        res.status(422).json({
                            success:false,
                            message:"Email or password incorrect"
                        })
                    }
                });
            } else {
                res.status(422).json({
                    success:false,
                    message:"User does not exist"
                })
            }
        }
    });
});

router.get('/logout',function(req,res) {
    res.status(201).json({
        message:"Logout successful"
    })
})

module.exports = router;
