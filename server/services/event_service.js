//student service
module.exports = 
	function(db, eventId, Latitude, Longitude, isStudent) {
  let eventUpdate;
  if (isStudent === 1){
    eventUpdate = "Update " +
    "Event " +
    "set StudentLatitude = " + Latitude + ", " +
    "StudentLongitude = " + Longitude + " " +
    "where EventId = " + eventId
  }else{
    eventUpdate = "Update " +
    "Event " +
    "set ProfessorLatitude = " + Latitude + ", " +
    "ProfessorLongitude = " + Longitude + " " +
    "where EventId = " + eventId
  }

  console.log(eventUpdate);

  db.query(eventUpdate, (err, result) => {
    if (err) {  
      reject(err); 
    } else {
      console.log("\n\rDados Atualizados na Base")  
      console.log(result)
    }
  }); 

  const eventSelect = "Select" + 
    "  *" +
    " from " + 
    "    Event " +
    " where " +
    "    EventId = " + eventId;

  console.log(eventSelect);

  return new Promise(function(resolve,reject){
    db.query(eventSelect, (err, result) => {
      if (err) {  
        reject(err); 
      } else {
        console.log("\n\rDados do Evento Recuperados da Base")  
        console.log(result)
        resolve(result);
      }
    });  
  });
}