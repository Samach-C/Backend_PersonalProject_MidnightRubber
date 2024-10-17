const express = require("express")
const router = express.Router()
const authorizationMiddleware = require("../middlewares/authorization")
const reviewsController = require("../controllers/review-controller")

router.post("/landmark/:id/reviews", authorizationMiddleware.auth, reviewsController.addReviews)
router.get("/landmark/:id/reviews", reviewsController.getReviews)

module.exports = router