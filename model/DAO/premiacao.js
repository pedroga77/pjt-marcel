/************************************************************
 * Objetivo: Criar o CRUD 
 * Data: 15/04/2025
 * Autor: pedro souza 
 * Versão: 1.0
 ************************************************************/

 //import da biblioteca do prisma client para executar os scripts SQL
const{ PrismaClient} = require('@prisma/client')


//Instanciar (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient

//Função para inserir um novo filme
const insertPreimiacao = async function(premiacao){
    try {
  let sql = `insert into tbl_premiacao(premiacao)                            
                                values
                                ('${premiacao.nome}')`
// Executa o scriptSQL no banco de dados e aguarda o retorno do BD para saber se deu certo
let result = await prisma.$executeRawUnsafe(sql)
if(result)
return true
else 
return false 

} catch (error) {
        

    }
                               

}

//Função para atualizar um Filme existente
const updatePremiacao = async function(premiacao){
    try {
        let sql  = `update tbl_nacionalidade   set nome               = '${premiacao.nome}'
                                        where id = ${premiacao.id}`

        let resultPremiacao = await prisma.$executeRawUnsafe(sql)
        
        if(resultPremiacao)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

// Função para deletar um filme existente 
 const deletePremiacao = async function(id){
     try {
         let sql = `delete from tbl_nacionalidade where id = ${id}`
     
         let result = await prisma.$executeRawUnsafe(sql)
     
         if(result)
             return true
         else
         return false 
     } catch (error) {
         return false 
     }   
 }

 const selectAllPremiacao = async function (){
    try{

        
        let sql = 'select * from tbl_premiacao order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdPremiacao = async function (id){

    try{
        let sql  = `select * from tbl_premiacao where id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
        return result
        else
        return false
    }catch(error){
        return false
    }

}


module.exports = {
    insertPreimiacao,
    updatePremiacao,
    deletePremiacao,
    selectAllPremiacao,
    selectByIdPremiacao
}