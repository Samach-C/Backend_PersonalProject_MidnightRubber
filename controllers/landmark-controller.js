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
        const landmark = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                detail: true,
                createdAt: true,
                updatedAt: true,
                lat: true,
                lng: true,
                userId: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })
        res.json(landmark)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.updateLandmark = async(req, res, next) => {
    try {
        const { landmarkId } = req.params
        const { title, detail, lat, lng } = req.body
        const landmark = await prisma.post.update({
            where : {
                id: parseInt(landmarkId)
            },
            data: {
                title : title,
                detail : detail,
                lat: lat,
                lng: lng
            }
        })
        res.json(landmark)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.removeLandmark = async(req, res, next) => {
    try {
        const { landmarkId } = req.params
        const landmark = await prisma.post.delete({
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