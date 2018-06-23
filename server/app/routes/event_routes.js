// event_routes.js
const eventService = require("../../services/event_service");

function distance(Student,Professor){
  const R = 6371; // Mean earth radius 
  let a = Math.pow(Math.sin((Student.Latitude - Professor.Latitude)/2),2) + Math.cos(Student.Latitude) * Math.cos(Professor.Latitude) * Math.pow(Math.sin((Student.Longitude - Professor.Longitude)/2),2);
  let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  let d = R * c;
  return d;
}

module.exports = function(app, db) { 
  app.post('/event/', (req, res) => {
    console.log("\n\rRequisicao Recebida:")
    console.log(req.body);

    let promiseEvent = eventService(db, req.body.eventId, req.body.Latitude, req.body.Longitude, req.body.isStudent)
    let EventBegin

    promiseEvent.then(
      function(result){
        console.log("\n\rResultado Devolvido")
        console.log(result[0]);

        let Event = JSON.parse(JSON.stringify(result[0]));
        let d;
        console.log(Event);

        if(Event.StudentLatitude !== null && Event.StudentLongitude !== null && Event.ProfessorLatitude !== null && Event.ProfessorLongitude !== null){
            let Student = {
                Latitude: Event.StudentLatitude,
                Longitude: Event.StudentLongitude};
            let Professor = {
                Latitude: Event.ProfessorLatitude,
                Longitude: Event.ProfessorLongitude};

            d = distance(Student,Professor)
        }else{
            d = -1
        }
        res.send({'req': d});
      }
    );
  })
}