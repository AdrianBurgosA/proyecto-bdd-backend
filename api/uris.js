const express = require('express')
var mysql = require('mysql')

const router = express.Router()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin1234',
    database: 'proyecto',
    port: 3306
})

connection.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('Conexion correcta.');
    }
})

//uris
const convertToInt = (res) => {
   var ints = []
   for(var i = 0; i < res.length; i++){
      ints.push(parseInt(res[i]))
   }
   return ints
}

const splitArray = (res) => {
   var ids = convertToInt(res.split(","))
   return ids
}

router.get("/getSintomas",(err,res) => {
   const query = connection.query("SELECT sintomas FROM sintomas", function(error,result){
      if(error){
         throw err
      }else{
         res.send(result)
      }
   })
})

router.get("/getProteger",(err,res) => {
   const query = connection.query("SELECT proteger FROM proteger", function(error,result){
      if(error){
         throw err
      }else{
         res.send(result)
      }
   })
})

router.get("/getSintomas",(err,res) => {
   const query = connection.query("SELECT id_sintoma, sintomas FROM sintomas", function(error,result){
      if(error){
         throw err
      }else{
         res.send(result)
      }
   })
})

router.get("/getData",(err,res) => {
   var query_string = 'SELECT tipo_riesgo.riesgo, riesgo.definicion, riesgo,video, riesgo.imagen, riesgo.id_sintomas, riesgo.id_proteger from tipo_riesgo, riesgo where riesgo.id_tipo = tipo_riesgo.id_tipo'
   var query = connection.query(query_string,  function(error, result){
      var riesgos = []
      if(error){
         throw err;
      }else{
         for(var i = 0; i < result.length; i++){
            var riesgo = {
               name: '',
               def: '',
               video: '',
               img: '',
               sintomas: [],
               proteger: [],
            }
            riesgo.def = result[i].definicion
            riesgo.name = result[i].riesgo
            riesgo.video = result[i].video
            riesgo.img = result[i].imagen
            riesgo.sintomas  = splitArray(result[i].id_sintomas)
            riesgo.proteger = splitArray(result[i].id_proteger)
            riesgos.push(riesgo)
         }
            res.send(riesgos)
      }
   })
})
   
module.exports = router