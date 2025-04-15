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
const insertNacionalidade = async function(nacionalidade){
    try {
  let sql = `insert into tbl_nacionalidade(nacionalidade)                            
                                values
                                ('${nacionalidade.nome}')`
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
const updateNacionalidade = async function(nacionalidade){
    try {
        let sql  = `update tbl_nacionalidade   set nome               = '${nacionalidade.nome}'
                                        where id = ${nacionalidade.id}`

        let resultNacionalidade = await prisma.$executeRawUnsafe(sql)
        
        if(resultNacionalidade)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

 // Função para deletar um filme existente 
 const deleteNacionalidade = async function(id){
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

 const selectAllNacionalidade = async function (){
    try{

        
        let sql = 'select * from tbl_nacionalidade order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdNaconalidade = async function (id){

    try{
        let sql  = `select * from tbl_nacionalidade where id = ${id}`

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
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNaconalidade
}