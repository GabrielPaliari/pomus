// match_routes.js
const matchService = require("../../services/match_service");

module.exports = function(app, db) { 
  app.post('/match/', (req, res) => {
    console.log("Requisicao Recebida:")
    console.log(req.body);

    
    matchService(db, req.body.subjectid,).then(
      function(result){
        console.log("Resultado Devolvido")
        console.log(result);
        res.send({'req': result});
      }
    );
  })
}