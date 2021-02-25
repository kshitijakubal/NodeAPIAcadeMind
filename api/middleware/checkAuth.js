const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        const verified = jwt.verify(token, process.env.JWT_KEY);
        next();
    }
    catch(error){
        res.status(401).json({
            message:'Auth failed'
        })
    }

}