/************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de filmes
 * Data: 11/02/2025
 * Autor: pedro souza 
 * Versão: 1.0
 ************************************************************/

 //import da biblioteca do prisma client para executar os scripts SQL
const{ PrismaClient} = require('@prisma/client')


    //Instanciar (criar um objeto a ser utilizado) a biblioteca do prisma/client
    const prisma = new PrismaClient

//Função para inserir um novo filme
const insertGenero = async function(genero){
    try {
  let sql = `insert into tbl_genero(genero)                            
                                values
                                ('${genero.nome}')`
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
const updateGenero = async function(genero){
    try {
        let sql  = `update tbl_genero   set nome               = '${genero.nome}'
                                        where id = ${genero.id}`

        let resultGenero = await prisma.$executeRawUnsafe(sql)
        
        if(resultGenero)
            return true
        else
        return false
    } catch (error) {
        return false
    }
 }

 // Função para deletar um filme existente 
 const deleteGenero = async function(id){
     try {
         let sql = `delete from tbl_genero where id = ${id}`
     
         let result = await prisma.$executeRawUnsafe(sql)
     
         if(result)
             return true
         else
         return false 
     } catch (error) {
         return false 
     }   
 }

 const selectAllGenero = async function (){
    try{

        
        let sql = 'select * from tbl_genero order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
        return result
        else
        return false
    }catch(error){
        return false
    }
}

const selectByIdGenero = async function (id){

    try{
        let sql  = `select * from tbl_genero where id = ${id}`

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}