// Import do arquivo de mensagem e status code do projeto
const message = require('../../modulo/config.js')

const nacionalidadeDAO = require('../../model/DAO/nacionalidade.js')

// Função para tratar a inserção de um novo filme no DAO
const inserirNacionalidade = async function(nacionalidade, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if (
    nacionalidade.nome == '' || nacionalidade.nome == undefined || nacionalidade.nome == null || nacionalidade.nome.length > 80 ) {
    
        return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
    let resultNacionalidade = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

    if (resultNacionalidade) 
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
const atualizarNacionalidade = async function(id, nacionalidade, contentType) {

try {
  if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if  (id      == ''            || id == undefined                    || id ==  null             || isNaN(id)  || id <= 0  ||
    nacionalidade.nome == ''            || nacionalidade.nome == undefined            || nacionalidade.nome == null      || nacionalidade.nome.length > 80 
  ) {
    return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
 //Validação para verificar se o ID existe no BD
 let resultNacionalidade = await nacionalidadeDAO.selectByIdNaconalidade(parseInt(id))

 if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
  if(resultNacionalidade.length > 0 ){
    //  Update
    //Adiciona o ID do filme no JSON com os dados
      nacionalidade.id = parseInt(id)
      
     let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

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
const excluirNacionalidade = async function(id) {
  try {
    if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 ){
      return message.ERROR_REQUIRED_FIELDS //400
    }else{
      let resultNacionalidade = await nacionalidadeDAO.selectByIdNaconalidade(parseInt(id))

      if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
        if(resultNacionalidade.length > 0){
          //Delete
          let result = await nacionalidadeDAO.deleteNacionalidade(parseInt(id))

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
const ListarNacionalidade = async function() {
  try {
    let resultNacionalidade = await nacionalidadeDAO.selectAllNacionalidade()
    if(resultNacionalidade != false){
      if(resultNacionalidade.length > 0){
        // Criando um JSON de retorno de dados para API
        let dadosNacionalidade = {};
         dadosNacionalidade.status = true
         dadosNacionalidade.status_code = 200
         dadosNacionalidade.itens = resultNacionalidade.length
         dadosNacionalidade.nacionalidade = resultNacionalidade
         
         return dadosNacionalidade
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

const buscarNacionalidade = async function(id_nacionalidade, contentType){
  try { 
          if(
              id_nacionalidade == ''               ||   id_nacionalidade                == undefined || id_nacionalidade            == null || isNaN(id_nacionalidade) || id_nacionalidade <=0
          ){
              return message.ERROR_REQUIRED_FIELDS //erro 400
          }else{
              dadosNacionalidade = {}
              let resultNacionalidade = await nacionalidadeDAO.selectByIdNaconalidade(parseInt(id_nacionalidade))
              if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                  if(resultNacionalidade.length > 0){
                      dadosNacionalidade.status = true
                      dadosNacionalidade.status_code = 200
                      dadosNacionalidade.nacionalidade = resultNacionalidade
              return dadosNacionalidade
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
    inserirNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade,
    ListarNacionalidade,
    buscarNacionalidade
}