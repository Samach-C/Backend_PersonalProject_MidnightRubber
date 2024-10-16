const prisma = require("../config/prisma")

module.exports.listMember = async(req, res, next) => {
    try {
        const member = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })
        res.json(member)
    } catch (err) {
        console.log(err)
        next(err)        
    }
}

module.exports.updateMember = async(req, res, next) => {
    try {
        const { memberId } = req.params
        const { role } = req.body  
        const member = await prisma.user.update({
            where : {
                id: Number(memberId),
            },
            data: {
                role: role
            }
        }) 
        console.log(role)
        res.json({ message: "Update Success"})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.removeMember = async(req, res, next) => {
    try {
        const { memberId } = req.params
        const member = await prisma.user.delete({
            where: {
                id: Number(memberId),
            }
        })
        console.log(memberId)
        res.json({ message: "Delete Success"})
    } catch (err) {
        console.log(err)
        next(err)
    }
}