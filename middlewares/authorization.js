const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

module.exports.auth = (req, res, next) => {
  try {
    // Step1 Check headers
    const authHeader = req.headers.authorization;
    // ถ้าไม่มี token ส่งมากับ header
    // console.log("authHeader-===", authHeader)
    if (!authHeader) {
      return createError(400, "Token missing");
    }
    const token = authHeader.split(" ")[1];
    console.log(token);

    // step2 Decode
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      // ถ้ามี  error
      if (err) {
        return createError(400, "Token Invalid");
      }
        // console.log(d)
      // step3 Next
      req.user = decode;
      console.log('decode===', decode)
      next();
    });
  } catch (err) {
    next(err);
  }
};
