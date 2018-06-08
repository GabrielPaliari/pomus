// user_routes.js
module.exports = function(app, db) { 
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log("id:" + id);
    var sql = "SELECT * FROM user WHERE userid = " + id; 
    console.log(sql);
    db.query(sql, function (err, result) {
      if (err) {
        res.send({'error': err});
      } else {
        res.send({'success': "Usuário selecionado",
                  'result': result });
      } 
    });
  });

  app.post('/users/', (req, res) => {
    console.log(req.body);
    var sql = "INSERT INTO user (UserName, Address) "
            + " VALUES ('" 
            + req.body.userName + "','" 
            + req.body.address + "');";

    console.log(sql);
    db.query(sql, function (err, result) {
      if (err) {
        throw err; 
        res.send({ 'error': 'An error has occurred',
                   'message': err }); 
      } else {
        console.log("Usuário criado com sucesso");
        res.send({'req': req.firstname,
                  'success': "Usuário Criado com Sucesso"});
      }
    });
  });
};