const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.headers.authorization;

    // console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({
            msg: 'Unauthorized: Token not provided'
        });
    }

    jwt.verify(token, '12345', (err, decoded)=>{
        if (err) {
            return res.status(401).json({
                msg: 'Unauthorized: Invalid token'
            });
        }

        req.userId = decoded._id;
        next();
    });
}

module.exports = {
    verifyToken
};