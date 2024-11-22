const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

const authRoute = require("./routes/auth-route")
const landmarkRoute = require("./routes/landmark-route")
const memberRoute = require("./routes/member-route")
const reviewRoute = require("./routes/review-route")
const handleError = require("./middlewares/error-middleware")
const notFoundHandler = require("./middlewares/not-found")


app.use(morgan("dev")) // บันทึกข้อมูลของ HTTP requests ใน Express เพื่อช่วยในการ debug, monitoring และ logging ระบบ
app.use(express.json()) // ใช้สำหรับแปลงข้อมูล JSON ที่ถูกส่งมาผ่าน HTTP request body ให้เป็น JavaScript object
app.use(cors()) // เชื่อมระหว่างfrontกับBack จะอนุญาตให้ทุกโดเมนส่ง request ข้ามโดเมนไปยังเซิร์ฟเวอร์ได้ ใช้เพื่อแก้ปัญหาที่เกิดจากการร้องขอข้ามโดเมนที่ถูกบล็อคในเว็บแอปพลิเคชัน

app.use("/", authRoute)
app.use("/", memberRoute)
app.use("/", landmarkRoute)
app.use("/", reviewRoute)

app.use(handleError)
app.use("*", notFoundHandler)

app.listen(5588, () => console.log("Server is running on port 5588"))