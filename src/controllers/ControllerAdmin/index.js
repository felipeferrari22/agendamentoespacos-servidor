const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

/**
 * @api {post} /CadastroSolicitante Cadastro Usuário
 * @apiName CadastroUsuario
 * @apiGroup Usuário
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * 
 * @apiBody {String} nome Nome do solicitante  
 * @apiBody {String} email E-mail do solicitante
 * @apiBody {String} empresa Empresa do solicitante
 * @apiBody {String} senha Senha do solicitante
 * @apiBody {String} cargo Cargo do solicitante 
 * @apiBody {String} telefone Telefone do solicitante  
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Usuário Cadastrado"
 *  tokenAcesso: [Token de Acesso JWT]
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Senha incorreta"
 * }
 */

const CadastroUsuario = (req, res) => {    
    const main = async () => {
        const {email, nome, empresa, senha, cargo, telefone} = req.body
        const {HashPwd} = require('./../../services')
        await prisma.usuario.create({
            data: {
                email: email,
                nome: nome,
                empresa: empresa,
                senha: await HashPwd(senha),
                cargo: cargo,
                telefone: telefone,
            }
        })
        res.status(201).send({message: "Usuário Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send(err); throw err})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    CadastroUsuario,
}