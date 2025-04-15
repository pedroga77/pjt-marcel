// Import do arquivo de mensagem e status code do projeto
const message = require('../../modulo/config.js')

const premiacaoDAO = require('../../model/DAO/premiacao.js')

// Função para tratar a inserção de um novo filme no DAO
const inserirPremiacao = async function(premiacao, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if (
    premiacao.nome == '' || premiacao.nome == undefined || premiacao.nome == null || premiacao.nome.length > 80 ) {
    
        return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
    let resultPremiacao = await premiacaoDAO.insertPreimiacao(premiacao)

    if (resultPremiacao) 
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
const atualizarPremiacao = async function(id, premiacao, contentType) {

try {
  if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if  (id      == ''            || id == undefined                    || id ==  null             || isNaN(id)  || id <= 0  ||
    premiacao.nome == ''            || premiacao.nome == undefined            || premiacao.nome == null      || premiacao.nome.length > 80 
  ) {
    return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
 //Validação para verificar se o ID existe no BD
 let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

 if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
  if(resultPremiacao.length > 0 ){
    //  Update
    //Adiciona o ID do filme no JSON com os dados
      premiacao.id = parseInt(id)
      
     let result = await premiacaoDAO.updatePremiacao(premiacao)

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
const excluirPremiacao = async function(id) {
  try {
    if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 ){
      return message.ERROR_REQUIRED_FIELDS //400
    }else{
      let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id))

      if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
        if(resultPremiacao.length > 0){
          //Delete
          let result = await premiacaoDAO.deletePremiacao(parseInt(id))

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
const ListarPremiacao = async function() {
  try {
    let resultPremiacao = await premiacaoDAO.selectAllPremiacao()
    if(resultPremiacao != false){
      if(resultPremiacao.length > 0){
        // Criando um JSON de retorno de dados para API
        let dadosPremiacao = {};
         dadosPremiacao.status = true
         dadosPremiacao.status_code = 200
         dadosPremiacao.itens = resultPremiacao.length
         dadosPremiacao.premiacao = resultPremiacao
         
         return dadosPremiacao
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

const buscarPremiacao = async function(id_premiacao, contentType){
  try { 
          if(
              id_premiacao == ''               ||   id_premiacao                == undefined || id_premiacao           == null || isNaN(id_premiacao) || id_premiacao <=0
          ){
              return message.ERROR_REQUIRED_FIELDS //erro 400
          }else{
              dadosPremiacao = {}
              let resultPremiacao = await premiacaoDAO.selectByIdPremiacao(parseInt(id_premiacao))
              if(resultPremiacao != false || typeof(resultPremiacao) == 'object'){
                  if(resultPremiacao.length > 0){
                      dadosPremiacao.status = true
                      dadosPremiacao.status_code = 200
                      dadosPremiacao.premiacao = resultPremiacao
              return dadosPremiacao
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
    inserirPremiacao,
    atualizarPremiacao,
    excluirPremiacao,
    ListarPremiacao,
    buscarPremiacao
}