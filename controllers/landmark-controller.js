const prisma = require("../config/prisma")

module.exports.createLandmark = async(req, res, next) => {
    console.log(req.user, "hi")
    try {
        console.log("here", req.body)

        const landmark = await prisma.post.create({
            data: {
                title: req.body.title,
                detail: req.body.detail,
                lat: Number(req.body.lat),
                lng: Number(req.body.lng),
                userId: req.user.id
            },
        })
        res.json(landmark)

    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.listLandmark = async(req, res, next) => {
    try {
        const landmark = await prisma.post.findMany()
        res.json(landmark)
    } catch (err) {
        next(err)
    }
}