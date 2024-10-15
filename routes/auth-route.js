const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
const authorizationMiddleware = require("../middlewares/authorization")
const { registerValidator, loginValidator } = require("../middlewares/validator")

router.post("/register", registerValidator, authController.register)
router.post("/login", loginValidator, authController.login)

router.post("/current-user", authorizationMiddleware.auth, authController.currentUser)

module.exports = router