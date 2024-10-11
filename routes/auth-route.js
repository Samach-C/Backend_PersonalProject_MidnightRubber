const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth-controller")
// const { registerValidator, loginValidator } = require("../middlewares/validator")
// const authorizationMiddleware = require("../middlewares/authorization")

router.post("/register", authController.register)
router.post("/login", authController.login)

router.post("/current-user", authController.currentUser)

module.exports = router