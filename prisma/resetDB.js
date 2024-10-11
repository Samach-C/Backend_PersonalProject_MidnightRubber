require("dotenv").config()
const prisma = require("../config/prisma")



async function run() {
    await prisma.$executeRawUnsafe("DROP DATABASE personalPJ_Rubber")
    await prisma.$executeRawUnsafe("CREATE DATABASE personalPJ_Rubber")
}

console.log("Reset DB...")
run()