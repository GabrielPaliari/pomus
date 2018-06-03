//match service
module.exports = 
	function(db, subjectId) {
  const profSelect = " Select " +
  "   p.*, " +
  "   u.* " +
  " From " +
  "   Professor p " +
  "   Inner Join TopicProfessor tp " +
  " On p.UserId = tp.ProfessorId " +
  " Inner Join Topic t " +
  " On tp.TopicId = t.TopicId " +
  " Inner Join User u " +
  " On p.UserId = u.UserId  " +
  " Where " +
  "   t.SubjectId =" + subjectId +
  " Group By " +
  "   ProfessorId ";

  return new Promise(function(resolve,reject){
    db.query(profSelect, (err, result) => {
      if (err) {  
        reject(err); 
      } else {
        console.log("Dados Recuperados da Base")  
        console.log(result)
        resolve(result);
      }
    });  
  });
}