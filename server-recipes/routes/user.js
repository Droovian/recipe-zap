const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { passwordMiddleware } = require('../middleware/password');
const { verifyToken } = require('../middleware/jwt');
const { validateInput, generateId } = require('../middleware/zod');
const { User } = require('../db/db');

const jwtKey = '12345';

const app = express();

app.use(cors());
app.use(express.json());


router.post('/register', passwordMiddleware, async(req, res) => {

    // console.log('Received registration request:', req.body);

    const name = req.body.username;
    const email = req.body.email;
    const password = req.hashedPassword;

    const checkIfExists = await(User.find({ email }));

    if(checkIfExists.length > 0){
        return res.status(404).json({
            msg : 'User already exists, please try logging in'
        });
    }

    const validation = validateInput(req.body);

    if(!validation.success){
        res.status(400).json({
            msg: 'Enter a valid email / password of 8 characters'
        });
        return;
    }

    const user = new User({
        username : name,
        email : email,
        password: password
    });
    try{
        await user.save();

        res.json({
            msg : 'Sign-up was successful! Kudoz'
        });
    }
    catch(error){
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

router.post('/login', async(req, res) => {

    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).json({
                msg : 'Invalid email or password'
            });
        }

        const checkPass = await bcrypt.compare(password, user.password);

        if(checkPass){
            const token = jwt.sign({ userId: user._id }, `${jwtKey}`);

            return res.status(200).json({
                msg : 'Login Successful',
                token : token
            });
        }
        else{
            return res.status(401).json({
                msg : 'Invalid password'
            })
        }
    }
    catch(error){
        console.log('Error occured while logging in');

        res.status(500).json({
            msg : 'Internal server error'
        });
    }
});

router.get('/', verifyToken, async(req, res) => {
    res.send("Hellooooo you got access");
});

module.exports = router;

