const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

const authRoute = require("./routes/auth-route")
const landmarkRoute = require("./routes/landmark-route")
const memberRoute = require("./routes/member-route")
const handleError = require("./middlewares/error-middleware")
const notFoundHandler = require("./middlewares/not-found")


app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

app.use("/", authRoute)
app.use("/", memberRoute)
app.use("/", landmarkRoute)

app.use(handleError)
app.use("*", notFoundHandler)

app.listen(5588, () => console.log("Server is running on port 5588"))