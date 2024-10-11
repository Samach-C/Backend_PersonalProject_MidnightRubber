const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const hashedPassword = bcrypt.hashSync("123456", 10)

const userData = [
    {firstName : "Andy", lastName : "Codecamp", password : hashedPassword, email: "andy@ggg.mail",
        profileImage: "https://www.svgrepo.com/show/420364/avatar-male-man.svg"
    },
    {firstName : "Bobby", lastName : "Codecamp", password : hashedPassword, email: "bobby@ggg.mail",
        profileImage: "https://www.svgrepo.com/show/420316/indian-man-sikh.svg"
    },
    {firstName : "Candy", lastName : "Codecamp", password : hashedPassword, mobile: "1111111111",
        profileImage: "https://www.svgrepo.com/show/420322/avatar-female-portrait-2.svg"
    },
    {firstName : "Danny", lastName : "Codecamp", password : hashedPassword, mobile: "2222222222",
        profileImage: "https://www.svgrepo.com/show/420324/beard-hipster-male.svg"
    },
]

console.log("DB seed...")

async function run() {
    await prisma.user.createMany({data: userData})
}

run()