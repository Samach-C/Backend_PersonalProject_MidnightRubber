const prisma = require("../config/prisma")

module.exports.createLandmark = async(req, res, next) => {
    // console.log(req.user, "hi")
    try {
        // console.log("here", req.body)

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

module.exports.updateLandmark = async(req, res, next) => {
    try {
        const { landmarkId } = req.params
        const { title, detail, lat, lng } = req.body
        const landmark = await prisma.user.update({
            where : {
                id: Number(landmarkId)
            },
            data: {
                title : title,
                detail : detail,
                lat: lat,
                lng: lng
            }
        })
        console.log(data)
        res.json({ message: "Update Success"})
    } catch (err) {
        next(err)
    }
}

module.exports.removeLandmark = async(req, res, next) => {
    try {
        const { landmarkId } = req.params
        const landmark = await prisma.user.delete({
            where: {
                id: Number(landmarkId),
            }
        })
        console.log(landmarkId)
        res.json({ message: "Delete Success"})
    } catch (err) {
        next(err)
    }
}