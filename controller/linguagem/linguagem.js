// Import do arquivo de mensagem e status code do projeto
const message = require('../../modulo/config.js')

const linguagemDAO = require('../../model/DAO/linguagem.js')

// Função para tratar a inserção de um novo filme no DAO
const inserirLinguagem = async function(linguagem, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if (
    linguagem.linguagem == '' || linguagem.linguagem == undefined || linguagem.linguagem == null || linguagem.linguagem.length > 80 ) {
    
        return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
    let resultLinguagem = await linguagemDAO.insertLinguagem(linguagem)

    if (resultLinguagem) 
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
const atualizarLinguagem = async function(id, linguagem, contentType) {

try {
  if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if  (id      == ''            || id == undefined                    || id ==  null             || isNaN(id)  || id <= 0  ||
    linguagem.linguagem == ''            || linguagem.linguagem == undefined            || linguagem.linguagem == null      || linguagem.linguagem.length > 80 
  ) {
    return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
 //Validação para verificar se o ID existe no BD
 let resultLinguagem = await linguagemDAO.selectByIdLinguagem(parseInt(id))

 if(resultLinguagem != false || typeof(resultLinguagem) == 'object'){
  if(resultLinguagem.length > 0 ){
    //  Update
    //Adiciona o ID do filme no JSON com os dados
      linguagem.id = parseInt(id)
      
     let result = await linguagemDAO.updateLinguagem(linguagem)

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
const excluirLinguagem = async function(id) {
  try {
    if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 ){
      return message.ERROR_REQUIRED_FIELDS //400
    }else{
      let resultLinguagem = await linguagemDAO.selectByIdLinguagem(parseInt(id))

      if(resultLinguagem != false || typeof(resultLinguagem) == 'object'){
        if(resultPremiacao.length > 0){
          //Delete
          let result = await linguagemDAO.deleteLinguagem(parseInt(id))

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