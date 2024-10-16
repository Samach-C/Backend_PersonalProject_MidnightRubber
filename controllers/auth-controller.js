const prisma  = require('../config/prisma')
const bcrypt = require("bcryptjs/dist/bcrypt")
const createError = require("../utils/createError")
const jwt = require("jsonwebtoken")



module.exports.register = async(req, res, next) => {
    const { email, firstName, lastName, password, confirmPassword} = req.body
    
    try {
        if( !(email.trim() && firstName.trim() && lastName.trim() && password.trim() && confirmPassword.trim()) ) {
            createError(400, "Please fill all data")
        }
    
        if(password !== confirmPassword) {
            createError(400, "Check confirm password")
        }

        // console.log( email, firstName, lastName, password, confirmPassword)

        const user = await prisma.user.findUnique({
            where: {
                email : email
            }
        })
        
        if(user) {
            createError(400, 'Email already exits')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            email : email,
            password : hashedPassword,
            firstName,
            lastName
        }

        const result = await prisma.user.create({
            data : newUser
        })

        res.json({message: "Register Successfull", result})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.login = async(req, res, next) => {
    // console.log("hello login")
    const { email, password} = req.body
    try {
        if(!(email.trim() && password.trim())) {
            createError(400, "Please fill all data")
        }

        const findUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        console.log(findUser)

        if(!findUser) {
            createError(400, "Invalid Login")
        }

        let passwordOk = await bcrypt.compare(password, findUser.password)
        if(!passwordOk) {
            createError(400, "Invalid Login")
        }
        const payload = {
            id: findUser.id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "30d"})
        console.log(token)
        const { password : pw, createAt, updateAt, ...userData} = findUser
        res.json({token : token, user: userData})
    } catch (err) {
        next(err)
    }
}

module.exports.currentUser = async(req, res, next) => {
    try {
        // console.log('req.user', req.user)
        const {id} = req.user

        const member = await prisma.user.findFirst({
            where: {
                id
            },
            select : {
                id: true,
                email: true,
                role: true,
            }
        })
        console.log(member)
        res.json({ member })
    } catch (err) {
        console.log(err)
        next(err)
    }
}