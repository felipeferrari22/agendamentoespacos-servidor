const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

/**
 * @api {post} /Login Logar Usuário
 * @apiName LoginUsuario
 * @apiGroup Usuário
 * @apiVersion 1.0.0
 * 
 * @apiPermission Nenhuma
 * 
 * @apiBody {String} email E-mail do usuário
 * @apiBody {String} senha Senha do usuário  
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
        const { AuthPwd, } = require('../../services')
        
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        })
        const admin = await prisma.admin.findUnique({
            where: {
                email: email,
            }
        })

        if(usuario) {
            if(await AuthPwd(usuario.senha, senha)) {
                const dados = {
                    email: usuario.email,
                    nome: usuario.nome,
                    id: usuario.id,
                    belongsTo: "SOLICITANTE"
                }
                const accessToken= jwt.sign(
                    dados,
                    process.env.JWT_ACCESS_TOKEN_SECRET,
                    {expiresIn: "1d"}
                )
                return res.status(202).send({accessToken, message: "Login bem-sucedido!"})
            } else {
                return res.status(401).send({message: "Senha incorreta"})
            }
        } else if(admin) {
            if(await AuthPwd(admin.senha, senha)) {
                const dados = {
                    email: admin.email,
                    nome: admin.nome,
                    id: usuario.id,
                    belongsTo: "ADMIN"
                }
                const accessToken= jwt.sign(
                    dados,
                    process.env.JWT_ACCESS_TOKEN_SECRET,
                    {expiresIn: "1d"}
                )
                return res.status(202).send({accessToken, message: "Login bem-sucedido!"})
            } else {
                return res.status(401).send({message: "Senha incorreta"})
            }
        }else {
            return res.status(404).send({message: "Usuário não cadastrado"})
        }
    }

    main()
        .catch((err)=>{res.status(400).send(err); throw err})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    LoginUsuario,
}