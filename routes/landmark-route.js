const express = require("express")
const router = express.Router()
const landmarkController = require("../controllers/landmark-controller")
const authorizationMiddleware = require("../middlewares/authorization")

router.post("/landmark", landmarkController.createLandmark)
router.get("/landmark", landmarkController.listLandmark)
router.patch("/landmark/:landmarkId", authorizationMiddleware.auth, landmarkController.updateLandmark)
router.delete("/landmark/:landmarkId", authorizationMiddleware.auth, landmarkController.removeLandmark)

module.exports = router