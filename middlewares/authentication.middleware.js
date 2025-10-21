import jwt from "jsonwebtoken"

export function authenticationMiddleware(req,res,next) {
    const headers = req.headers
    const token = headers?.authorization?.split("Bearer ")[1]

    if(!token){
        return res.status(400).json({message: 'Token não fornecido.'})
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    if(!decodedToken){
        return res.status(400).json({message: "Token inválido"})
    }

    req.user = decodedToken

    next()
}