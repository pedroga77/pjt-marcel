/************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme
 * Data: 11/02/2025
 * Autor: pedro souza 
 * Versão: 1.0
 ************************************************************/

// Import do arquivo de mensagem e status code do projeto
const message = require('../../modulo/config.js')

const filmeDAO = require('../../model/DAO/filme.js')

// Função para tratar a inserção de um novo filme no DAO
const inserirFilme = async function(filme, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if (
    filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 80 ||
    filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 80 ||
    filme.sinopse == '' || filme.sinopse == undefined || filme.sinopse == null || 
    filme.data_lancamento == '' || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
    filme.foto_capa == '' || filme.foto_capa.length > 200 ||
    filme.link_trailer == '' || filme.link_trailer.length > 200
  ) {
    return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
    let resultFilme = await filmeDAO.insertFilme(filme)

    if (resultFilme) 
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
const atualizarFilme = async function(id, filme, contentType) {

try {
  if (String(contentType).toLowerCase() == 'application/json')

    {

  
  if  (id      == ''            || id == undefined                    || id ==  null             || isNaN(id)  || id <= 0                          ||
    filme.nome == ''            || filme.nome == undefined            || filme.nome == null      || filme.nome.length > 80    ||
    filme.duracao == ''         || filme.duracao == undefined         || filme.duracao == null   || filme.duracao.length > 80 ||
    filme.sinopse == ''         || filme.sinopse == undefined         || filme.sinopse == null   || 
    filme.data_lancamento == '' || filme.data_lancamento == undefined || filme.data_lancamento == null || filme.data_lancamento.length > 10 ||
    filme.foto_capa == ''       || filme.foto_capa.length > 200       ||
    filme.link_trailer == ''    || filme.link_trailer.length > 200
  ) {
    return message.ERROR_REQUIRED_FIELDS // 400   
  } else {
 //Validação para verificar se o ID existe no BD
 let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

 if(resultFilme != false || typeof(resultFilme) == 'object'){
  if(resultFilme.length > 0 ){
    //  Update
    //Adiciona o ID do filme no JSON com os dados
      filme.id = parseInt(id)
      
     let result = await filmeDAO.updateFilme(filme)

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
const excluirFilme = async function(id) {
  try {
    if(id == '' || id == undefined || id == null|| isNaN(id) || id <=0 ){
      return message.ERROR_REQUIRED_FIELDS //400
    }else{
      let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id))

      if(resultFilme != false || typeof(resultFilme) == 'object'){
        if(resultFilme.length > 0){
          //Delete
          let result = await filmeDAO.deleteFilme(parseInt(id))

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
const listarFilme = async function() {
  try {
    let resultFilme = await filmeDAO.selectAllFilme()
    if(resultFilme != false){
      if(resultFilme.length > 0){
        // Criando um JSON de retorno de dados para API
        let dadosFilme = {};
         dadosFilme.status = true
         dadosFilme.status_code = 200
         dadosFilme.itens = resultFilme.length
         dadosFilme.films = resultFilme
         
         return dadosFilme
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
const buscarFilme = async function(id_filme, contentType){
  try { 
          if(
              id_filme == ''               ||   id_filme                == undefined || id_filme            == null || isNaN(id_filme) || id_filme <=0
          ){
              return message.ERROR_REQUIRED_FIELDS //erro 400
          }else{
              dadosFilmes = {}
              let resultFilme = await filmeDAO.selectByIdFilme(parseInt(id_filme))
              if(resultFilme != false || typeof(resultFilme) == 'object'){
                  if(resultFilme.length > 0){
                      dadosFilmes.status = true
                      dadosFilmes.status_code = 200
                      dadosFilmes.films = resultFilme
              return dadosFilmes
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
    inserirFilme,
    atualizarFilme,
    excluirFilme,
    listarFilme,
    buscarFilme
}

