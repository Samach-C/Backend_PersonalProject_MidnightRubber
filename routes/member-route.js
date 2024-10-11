const express = require("express")
const router = express.Router()
const memberController = require("../controllers/member-controller")
const authorizationMiddleware = require("../middlewares/authorization")


router.get("/member", memberController.listMember)
router.patch("/member/:memberId", authorizationMiddleware.auth, memberController.updateMember)
router.delete("/member/:memberId", authorizationMiddleware.auth, memberController.removeMember)


module.exports = router