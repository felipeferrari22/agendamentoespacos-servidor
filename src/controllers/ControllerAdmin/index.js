const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

/**
 * @api {post} /CadastroEspaco Cadastro Espaço
 * @apiName CadastroEspaco
 * @apiGroup Espaços
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * 
 * @apiBody {String} nome Nome do espaço  
 * @apiBody {String} ponto_referencia Ponto de referência do espaço
 * @apiBody {String} descricao Descrição do espaço 
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Espaço Cadastrado"
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Espaço já estava cadastrado"
 * }
 */

 const CadastroEspaco = (req, res) => {    
    const main = async () => {
        const {nome, ponto_referencia, descricao} = req.body
        await prisma.espaco.create({
            data: {
                nome: nome,
                ponto_referencia: ponto_referencia,
                descricao: descricao,
            }
        })
        res.status(201).send({message: "Espaço Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send(err); throw err})
        .finally(async ()=>{await prisma.$disconnect()})
}

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
 *  message: "Usuário já estava cadastrado"
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

/**
 * @api {post} /CadastroAdmin Cadastro Administrador
 * @apiName CadastroAdmin
 * @apiGroup Administrador
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * 
 * @apiBody {String} nome Nome do administrador  
 * @apiBody {String} email E-mail do administrador
 * @apiBody {String} empresa Empresa do administrador
 * @apiBody {String} senha Senha do administrador
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Administrador Cadastrado"
 *  tokenAcesso: [Token de Acesso JWT]
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Administrador já estava cadastrado"
 * }
 */

const CadastroAdmin = (req, res) => {    
    const main = async () => {
        const {email, nome, empresa, senha} = req.body
        const {HashPwd} = require('./../../services')
        await prisma.admin.create({
            data: {
                email: email,
                nome: nome,
                empresa: empresa,
                senha: await HashPwd(senha),
            }
        })
        res.status(201).send({message: "Administrador Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send(err); throw err})
        .finally(async ()=>{await prisma.$disconnect()})
}

 /**
 * @api {delete} /DeletarSolicitante Deletar Usuário
 * @apiName Deletar Usuário
 * @apiGroup Usuário
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Solicitante removido"
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: ""
 * }
 */

module.exports = {
    CadastroUsuario,
    CadastroAdmin,
    CadastroEspaco,
}