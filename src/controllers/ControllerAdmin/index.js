const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * @api {post} /CadastroEspaco Cadastro Espaço
 * @apiName CadastroEspaco
 * @apiGroup Espaços
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
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
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const {nome, ponto_referencia, descricao} = req.body
        try{
            await prisma.espaco.create({
                data: {
                    nome: nome,
                    ponto_referencia: ponto_referencia,
                    descricao: descricao,
                }
            })
        }catch(err){
            //Erro previsto pelo Prisma -> Linha já existente
            if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") { 
                return res.status(400).send({message: "Espaço já estava cadastrado", error: err})
            } else {
                throw err;
            }
        }
        return res.status(201).send({message: "Espaço Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro no cadastro do espaço", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {post} /CadastroSolicitante Cadastro Usuário
 * @apiName CadastroUsuario
 * @apiGroup Usuário
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
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
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Erro no cadastro do usuário",
 *  error: {errorObject}
 * }
 */

const CadastroUsuario = (req, res) => {    
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})
        
        const {email, nome, empresa, senha, cargo, telefone} = req.body
        const {HashPwd} = require('./../../services')
        
        try{
            await prisma.usuario.create({
                data: {
                    email: email,
                    nome: nome,
                    empresa: empresa,
                    senha: await HashPwd(senha),
                    cargo: cargo,
                    telefone: telefone
                }
            })
        }catch(err){
            //Erro previsto pelo Prisma -> Linha já existente
            if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") { 
                return res.status(400).send({message: "Usuário já estava cadastrado", error: err})
            } else {
                throw err;
            }
        }
        
        return res.status(201).send({message: "Usuário Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro no cadastro do usuário", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {post} /CadastroPerfil Cadastro Administrador
 * @apiName CadastroPerfil
 * @apiGroup Administrador
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 * 
 * @apiBody {String} nome Nome do administrador  
 * @apiBody {String} email E-mail do administrador
 * @apiBody {String} empresa Empresa do administrador
 * @apiBody {String} senha Senha do administrador
 * @apiBody {String} telefone Telefone do administrador
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
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const {email, nome, empresa, senha, telefone} = req.body
        const {HashPwd} = require('./../../services')

        try{
            await prisma.admin.create({
                data: {
                    email: email,
                    nome: nome,
                    empresa: empresa,
                    senha: await HashPwd(senha),
                    telefone: telefone
                }
            })
        }catch(err){
            //Erro previsto pelo Prisma -> Linha já existente
            if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") { 
                return res.status(400).send({message: "Administrador já estava cadastrado", error: err})
            } else {
                throw err;
            }
        }

        return res.status(201).send({message: "Administrador Cadastrado"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro no cadastro do administrador", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {get} /BuscarSolicitantes Buscar Usuários
 * @apiName Buscar Usuários
 * @apiGroup Usuário
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Busca feita com sucesso",
 *  usuarios: [{id, nome, empresa, telefone}, ...]
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Erro na busca de usuários",
 *  error: {errorObject}
 * }
 */
const BuscarUsuarios = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const usuarios = await prisma.usuario.findMany()
        const dados = usuarios.map((usuarioAtual) => {
            
            return {
                id: usuarioAtual.id,
                nome: usuarioAtual.nome,
                empresa: usuarioAtual.empresa,
                telefone: usuarioAtual.telefone
            }
        })

        return res.status(200).send({message: "Busca feita com sucesso", usuarios: dados})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro na busca de usuários", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {delete} /DeletarSolicitante/:id Deletar Usuário
 * @apiName Deletar Usuário
 * @apiGroup Usuário
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 * 
 * @apiParam {Number} id id do solicitante
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Solicitante removido"
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Usuário não encontrado"
 * }
 */

const DeletarUsuario = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const id = req.params.id

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: parseInt(id),
            },
        })
        if(usuario === null) return res.status(404).send({message: "Usuário não encontrado"})

        await prisma.usuario.delete({
            where: {id: parseInt(id)}
        })
        
        return res.status(200).send({message: "Solicitante removido"})
    }
    main()
        .catch((err)=>{res.status(400).send({message: "Erro ao deletar usuário", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {get} /BuscarSolicitacoes Buscar Solicitações
 * @apiName Buscar Solicitações
 * @apiGroup Solicitações
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 *  
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Busca feita com sucesso",
 *  usuarios: [{id, data, horario_entrada, horario_saida, status, usuario_nome, usuario_empresa}, ...]
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Erro na busca de solicitações",
 *  error: {errorObject}
 * }
 */
const BuscarSolicitacoes = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const solicitacoes = await prisma.solicitacao.findMany({
            where: {status: "Pendente"}
        })

        const dados = await Promise.all(solicitacoes.map(async (solicitacaoAtual) => {
            
            const usuario = await prisma.usuario.findUnique({
                where: {id: parseInt(solicitacaoAtual.usuario_id)}
            })

            return {
                id: solicitacaoAtual.numero_solicitacao,
                data: solicitacaoAtual.data,
                horario_entrada: solicitacaoAtual.hora_entrada,
                horario_saida: solicitacaoAtual.hora_saida,
                status: solicitacaoAtual.status,
                espaco: solicitacaoAtual.espaco,
                usuario_nome: usuario.nome,
                usuario_empresa: usuario.empresa
            }
        }))

        return res.status(200).send({message: "Busca feita com sucesso", solicitacoes: dados})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro na busca de solicitações", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {put} /AprovarSolicitacoes/:id Aprovar Solicitação
 * @apiName Aprovar Solicitação
 * @apiGroup Solicitações
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 * 
 * @apiParam {Number} id Número da Solicitação
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Solicitação Aprovada"
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Erro na aprovação",
 *  error: {errorObject}
 * }
 */
const AprovarSolicitacoes = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const id = req.params.id

        //==============================

        // 1# Buscar Agendamentos Aprovados e Solicitação Atual
        const aprovados = await prisma.solicitacao.findMany({
            where: {status: "Aprovado"}
        })
        const solicitacao = await prisma.solicitacao.findUnique({
            where: {numero_solicitacao: parseInt(id)}
        })

        const { ConvHoraMs } = require('../../services')
        let existeConflito = false
        
        // 2# Comparar cada um para verificar choques
        aprovados.forEach((aprovAtual) => {
            if(aprovAtual.data === solicitacao.data && aprovAtual.espaco_id === solicitacao.espaco_id) {
                const hIni_Aprov = ConvHoraMs(aprovAtual.hora_entrada)
                const hFin_Aprov = ConvHoraMs(aprovAtual.hora_saida)
                const hIni_Solic = ConvHoraMs(solicitacao.hora_entrada)
                const hFin_Solic = ConvHoraMs(solicitacao.hora_saida)

                if(hIni_Solic < hFin_Aprov && hFin_Solic > hIni_Aprov) existeConflito = true
            }
        })

        if(existeConflito) return res.status(401).send({message: "Horário e Espaço indisponível!"})

        //==============================

        try{
            await prisma.solicitacao.update({
                where: {
                    numero_solicitacao: parseInt(id),
                },
                data: {
                    status: 'Aprovado',
                },
            })

        }catch(err){
            if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
                return res.status(404).send({message: "Solicitação não encontrada"})
            } else {
                throw err;
            }
        }

        return res.status(200).send({message: "Solicitação aprovada"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro na aprovação", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {delete} /DeletarSolicitacoes/:id Deletar Solicitação
 * @apiName Deletar Solicitação
 * @apiGroup Solicitações
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 * 
 * @apiParam {Number} id Número da Solicitação
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Solicitação removida com sucesso"
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Erro na remoção da solicitação",
 *  error: {errorObject}
 * }
 */
const DeletarSolicitacoes = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const id = req.params.id

        const solicitacao = await prisma.solicitacao.findUnique({
            where: {
                numero_solicitacao: parseInt(id),
            },
        })
        if(solicitacao === null) return res.status(404).send({message: "Solicitação não encontrada"})

        await prisma.solicitacao.delete({
            where: {numero_solicitacao: parseInt(id)}
        })

        return res.status(200).send({message: "Solicitação removida com sucesso"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro na remoção da solicitação", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {get} /BuscarAgendamentos Buscar Agendamentos
 * @apiName Buscar Agendamentos
 * @apiGroup Solicitações
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 *  
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Busca feita com sucesso",
 *  usuarios: [{id, data, horario, espaco, status}, ...]
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Erro na busca de agendamentos",
 *  error: {errorObject}
 * }
 */
const BuscarAgendamentos = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})
        const agendamentos = await prisma.solicitacao.findMany({
            where: {status: "Aprovado"}
        })

        const dados = agendamentos.map((agendamentoAtual) => {
            return {
                data: agendamentoAtual.data,
                horario: `${agendamentoAtual.hora_entrada} as ${agendamentoAtual.hora_saida}`,
                espaco: agendamentoAtual.espaco,
                status: agendamentoAtual.status,
                id: agendamentoAtual.numero_solicitacao
            }
        })

        return res.status(200).send({message: "Busca feita com sucesso", agendamentos: dados})
    }
    main()
        .catch((err)=>{res.status(400).send({message: "Erro na remoção da solicitação", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {delete} /DeletarEspacos/:id Deletar Espaço
 * @apiName Deletar Espaço
 * @apiGroup Espaços
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 * 
 * @apiParam {Number} id ID do Espaço
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Espaço removido com sucesso"
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Erro na remoção do espaço",
 *  error: {errorObject}
 * }
 */
 const DeletarEspacos = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const id = req.params.id

        const espaco = await prisma.espaco.findUnique({
            where: {
                id: parseInt(id),
            },
        })
        if(espaco === null) return res.status(404).send({message: "Espaço não encontrado"})

        await prisma.espaco.delete({
            where: {id: parseInt(id)}
        })

        return res.status(200).send({message: "Espaço removido com sucesso"})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro na remoção do espaço", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {get} /BuscarAdmins Buscar Administradores
 * @apiName Buscar Administradores
 * @apiGroup Admin
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Busca feita com sucesso",
 *  admin: [{id, nome, telefone, email}, ...]
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Erro na busca de usuários",
 *  error: {errorObject}
 * }
 */
 const BuscarAdmins = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "ADMIN") return res.status(403).send({message: "Permissão negada [!Admin]"})

        const admins = await prisma.admin.findMany()
        const dados = admins.map((adminAtual) => {
            
            return {
                id: adminAtual.id,
                nome: adminAtual.nome,
                email: adminAtual.email,
                telefone: adminAtual.telefone
            }
        })

        return res.status(200).send({message: "Busca feita com sucesso", admins: dados})
    }

    main()
        .catch((err)=>{res.status(400).send({message: "Erro na busca de usuários", error: err})})
        .finally(async ()=>{await prisma.$disconnect()})
}

module.exports = {
    CadastroUsuario,
    CadastroAdmin,
    CadastroEspaco,
    BuscarUsuarios,
    DeletarUsuario,
    BuscarSolicitacoes,
    AprovarSolicitacoes,
    DeletarSolicitacoes,
    BuscarAgendamentos,
    DeletarEspacos,
    BuscarAdmins
}