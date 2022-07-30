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
router.get("/getData",(err,res) => {
   var query = connection.query('select tema.titulo, imagen.link, tema.definicion, tema.reconocer, tema.proteger, video.link_video from tema, video, imagen where tema.id_imagen = imagen.id_imagen and tema.id_video = video.id_video',  function(error, result){
         if(error){
            throw err;
         }else{
            res.send(result);
         }
      }
      )
})
   
module.exports = router