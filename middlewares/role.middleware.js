function roleMiddleware(roles) {
    return (req, res, next) => {
        const user = req.user

        if (!user) {
            return res.status(401).json({ message: "Usuário não autenticado." })
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: "Acesso negado." })
        }

        next()
    }
}

export default {
    canAdmin: roleMiddleware([1]),
    canEmpresa: roleMiddleware([2]),
    canFuncionario: roleMiddleware([3]),
    canEmpresaAndFuncionario: roleMiddleware([2, 3])
}