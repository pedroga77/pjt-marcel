/************************************************************
 * Objetivo: Criar o CRUD 
 * Data: 15/04/2025
 * Autor: pedro souza 
 * Versão: 1.0
 ************************************************************/

// Import do arquivo de mensagem e status code do projeto
const message = require('../../modulo/config.js')

const generoDAO = require('../../model/DAO/genero.js')

// Função para tratar a inserção de um novo filme no DAO
const inserirGenero = async function(genero, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if (
    genero.nome == '' || genero.nome == undefined || genero.nome == null || genero.nome.length > 80 ) {
    
        return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
    let resultGenero = await generoDAO.insertGenero(genero)

    if (resultGenero) 
      return message.SUCCESS_CREATED_ITEM  // 201
    else
      return message.ERROR_INTERNAL_SERVER 
  }
}else{
  return message.ERROR_CONTENT_TYPE
}
} catch (error) {
  return message.ERROR_INTERNAL_SERVER_CONTROLLER   // 500
}
}

// Função para tratar a atualização de um filme no DAO
const atualizarGenero = async function(id, genero, contentType) {

try {
  if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if  (id      == ''            || id == undefined                    || id ==  null             || isNaN(id)  || id <= 0  ||
    genero.nome == ''            || genero.nome == undefined            || genero.nome == null      || genero.nome.length > 80 
  ) {
    return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
 //Validação para verificar se o ID existe no BD
 let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

 if(resultGenero != false || typeof(resultGenero) == 'object'){
  if(resultGenero.length > 0 ){
    //  Update
    //Adiciona o ID do filme no JSON com os dados
      genero.id = parseInt(id)
      
     let result = await generoDAO.updateGenero(genero)

     if(result){
      return message.SUCCESS_UPDATED_ITEM// 200
     }else{
      return message.ERROR_INTERNAL_SERVER_MODEL //500
     }
    }else{
      return message.ERROR_NOT_FOUND // 404
    }
 }else{
  return message.ERROR_INTERNAL_SERVER_MODEL // 500
 }
  }
  }else{
    return message.ERROR_CONTENT_TYPE // 415
  }
  } catch (error) {
   return message.ERROR_INTERNAL_SERVER_CONTROLER // 500

}


  
}

// Função para tratar a exclusão de um filme no DAO
const excluirGenero = async function(id) {
  try {
    if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 ){
      return message.ERROR_REQUIRED_FIELDS //400
    }else{
      let resultGenero = await generoDAO.selectByIdGenero(parseInt(id))

      if(resultGenero != false || typeof(resultGenero) == 'object'){
        if(resultGenero.length > 0){
          //Delete
          let result = await generoDAO.deleteGenero(parseInt(id))

          if(result){
            return message.SUCCESS_DELETED_ITEM // 200
          }else{
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
          }

        }else{
          return message.ERROR_NOT_FOUND // 404
        }
      }else{
       return message.ERROR_INTERNAL_SERVER_MODEL // 500
      }
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER
  }

}

// Função para tratar o retorno de uma lista de filmes do DAO
const ListarGenero = async function() {
  try {
    let resultGenero = await generoDAO.selectAllGenero()
    if(resultGenero != false){
      if(resultGenero.length > 0){
        // Criando um JSON de retorno de dados para API
        let dadosGenero = {};
         dadosGenero.status = true
         dadosGenero.status_code = 200
         dadosGenero.itens = resultGenero.length
         dadosGenero.genero = resultGenero
         
         return dadosGenero
      }else{
        return
      }
    }else{
      return message.ERROR_INTERNAL_SERVER_MODEL //500
    }
  } catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLER //500
  }
}

// Função para tratar o retorno de um filme filtrando pelo ID do DAO
const buscarGenero = async function(id_genero, contentType){
  try { 
          if(
              id_genero == ''               ||   id_genero                == undefined || id_genero            == null || isNaN(id_genero) || id_genero <=0
          ){
              return message.ERROR_REQUIRED_FIELDS //erro 400
          }else{
              dadosGenero = {}
              let resultGenero = await generoDAO.selectByIdGenero(parseInt(id_genero))
              if(resultGenero != false || typeof(resultGenero) == 'object'){
                  if(resultGenero.length > 0){
                      dadosGenero.status = true
                      dadosGenero.status_code = 200
                      dadosGenero.genero = resultGenero
              return dadosGenero
                  }else{
                      return message.ERROR_NOT_FOUND //404
                  }
              }else{
                  return message.ERROR_INTERNAL_SERVER_MODEL //500
              }
                  
          }
      
      }catch(error){
          return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
      }
}

module.exports = {
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    ListarGenero,
    buscarGenero
}