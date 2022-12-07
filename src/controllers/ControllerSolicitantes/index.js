const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * @api {post} /SolicitarAgendamento Solicitar Agendamento
 * @apiName SolicitarAgendamento
 * @apiGroup Solicitações
 * @apiVersion 1.0.0
 * 
 * @apiPermission Solicitante
 * @apiHeader {String} auth Token de acesso JWT
 * @apiHeaderExample {json} Exemplo de Header:
 * {
 *  "auth": [Token de Acesso JWT]
 * }
 * 
 * @apiBody {Int} espaco_id Id do espaço
 * @apiBody {String} data Data do agendamento (DD/MM/YY)
 * @apiBody {String} horario_entrada Horário de Entrada (HH:MM)
 * @apiBody {String} horario_saida Horário de Saída (HH:MM)
 * @apiBody {String} descricao Descrição da solicitação
 * 
 * @apiSuccessExample Exemplo de Sucesso:
 * {
 *  message: "Solicitação realizada"
 * }
 * @apiErrorExample Exemplo de Erro:
 * {
 *  message: "Espaço não encontrado"
 * }
 */
const SolicitarAgendamento = (req, res) =>  {
    const main = async () => {
        if(req.dados.belongsTo !== "SOLICITANTE") return res.status(403).send({message: "Permissão negada [!Solicitante]"})

        const { espaco_id, data, horario_entrada, horario_saida, descricao } = req.body

        const espaco = await prisma.espaco.findUnique({
            where: {id: parseInt(espaco_id)}
        })
        if(espaco === null) return res.status(404).send({message: "Espaço não encontrado"})

        await prisma.solicitacao.create({
            data: {
                status: "Pendente",
                data: data,
                hora_entrada: horario_entrada,
                hora_saida: horario_saida,
                descricao: descricao,
                espaco: espaco.nome,
                espaco_id: parseInt(espaco_id),
                usuario_id: parseInt(req.dados.id),
            }
        })

        return res.status(201).send({message: "Solicitação realizada"})
    }

    main()
    .catch((err)=>{res.status(400).send({message: "Erro na solicitação", error: err}); throw err})
    .finally(async ()=>{await prisma.$disconnect()})
}

/**
 * @api {get} /BuscarMeusAgendamentos Buscar Agendamentos do Solicitante
 * @apiName Buscar Agendamentos do Solicitante
 * @apiGroup Solicitações
 * @apiVersion 1.0.0
 * 
 * @apiPermission Solicitante
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
 const BuscarMeusAgendamentos = (req, res) => {
    const main = async () => {
        if(req.dados.belongsTo !== "SOLICITANTE") return res.status(403).send({message: "Permissão negada [!Solicitante]"})

        const agendamentos = await prisma.solicitacao.findMany({
            where: {usuario_id: parseInt(req.dados.id)} && {status: "Aprovado"}
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


module.exports = {
    SolicitarAgendamento,
    BuscarMeusAgendamentos
}