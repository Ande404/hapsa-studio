'use strict';
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser")();

 function validateToken(req, res, next) {
  // get token rom header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const decodedIdToken = admin.auth().verifyIdToken(req.headers.authorization.split('Bearer ')[1]).then((decodedIdToken) => {
      req.user = decodedIdToken
      next();
    }).catch((error) => {
      res.status(401).json({
        error: "Unathorized bram"
      })
    });
  } else {
    res.status(401).json({
      error: "Unauthorized kaka"
    })
  }
}


exports.validateToken = validateToken