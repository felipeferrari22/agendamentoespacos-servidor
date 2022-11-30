const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

/**
 * @api {post} /Login Logar Usuario
 * @apiName LoginUsuario
 * @apiGroup Usuario
 * @apiVersion 1.0.0
 * 
 * @apiPermission Nenhum
 * 
 * @apiBody {String} email E-mail do usuario
 * @apiBody {String} senha Senha do usuario  
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Login bem-sucedido!"
 *  tokenAcesso: [Token de Acesso JWT]
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Senha incorreta"
 * }
 */

const LoginUsuario = (req, res) => {    
    const main = async () => {
        const {email, senha} = req.body
        const { AuthPwd, } = require('./../../services')
        
        const usuario = await prisma.usuario.findUnique({
            where: {
              email: email,
            },
        })
        if(usuario) {
            if(await AuthPwd(usuario.senha, senha)) {
                const dados = {
                    email: usuario.email,
                    nome: usuario.nome,
                }
                const accessToken= jwt.sign(
                    dados,
                    process.env.JWT_ACCESS_TOKEN_SECRET,
                    {expiresIn: "1d"}
                )
                res.status(202).send({accessToken, message: "Login bem-sucedido!"})
            } else {
                res.status(401).send({message: "Senha incorreta"})
            }
        } else {
            res.status(404).send({message: "Usuário não cadastrado"})
        }
    }

    main()
        .catch((err)=>{res.status(400).send(err); throw err})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    LoginUsuario,
}