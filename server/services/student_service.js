//student service
module.exports = 
	function(db, studentId) {
  const studSelect = "Select" + 
    "  u.*" +
    " from " +
    "    Student s Inner Join " +
    "    User u on s.UserId = u.UserId " +
    " where " +
    "    s.UserId = " + studentId;

  return new Promise(function(resolve,reject){
    db.query(studSelect, (err, result) => {
      if (err) {  
        reject(err); 
      } else {
        console.log("\n\rDados Aluno Recuperados da Base")  
        console.log(result)
        resolve(result);
      }
    });  
  });
}