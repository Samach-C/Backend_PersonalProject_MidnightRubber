const prisma = require("../config/prisma")

// ฟังก์ชันเพิ่มรีวิว
module.exports.addReviews = async(req, res, next) => {
    const { id } = req.params // id ของโพสต์ที่ต้องการรีวิว
    const { comment, rating } = req.body // ข้อมูลที่ส่งเข้ามา
    try {
        // สร้างรีวิวใหม่
        const review = await prisma.comment.create({
            data: {
                comment,
                rating,
                postId: Number(id), // เชื่อมโยงรีวิวกับโพสต์
                userId: req.user.id, // ใช้ user id จาก token ที่ตรวจสอบ
            }
        })

        res.status(201).json(review) // ส่งกลับรีวิวที่สร้างขึ้น
    } catch (err) {
        console.error("Error adding review", err)
        next(err) // ส่งต่อไปยัง middleware ต่อไป
    }
}

// ฟังก์ชันดึงรีวิวสำหรับโพสต์

module.exports.getReviews = async(req, res, next) => {
    const { id } = req.params // id ของโพสต์ที่ต้องการดึงรีวิว
    try {
        const reviews = await prisma.comment.findMany({
            where: {
                postId: Number(id)
            }, // ค้นหาตาม postId
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })
        res.json(reviews) // ส่งกลับรีวิวทั้งหมด
    } catch (err) {
        console.error("Error fetching reviews", err)
        next(err)
    }
}