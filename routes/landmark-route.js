const express = require("express")
const router = express.Router()
const landmarkController = require("../controllers/landmark-controller")
const authorizationMiddleware = require("../middlewares/authorization")

router.post("/landmark", authorizationMiddleware.auth, landmarkController.createLandmark)
router.get("/landmark", authorizationMiddleware.auth, landmarkController.listLandmark)

module.exports = router