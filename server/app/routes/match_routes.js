// match_routes.js
const matchService = require("../../services/match_service");
const studentService = require("../../services/student_service");

const p1 = - (1 / 50); //Distancia
const p2 = - (1 / 75); //Preço
const p3 = 1 / 2.5;//Avaliação

function distance(Student,Professor){
  const R = 6371; // Mean earth radius 
  // console.log(Student.Latitude);
  // console.log(Student);
  let a = Math.pow(Math.sin((Student.Latitude - Professor.Latitude)/2),2) + Math.cos(Student.Latitude) * Math.cos(Professor.Latitude) * Math.pow(Math.sin((Student.Longitude - Professor.Longitude)/2),2);
  let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  let d = R * c;
  return d;
}

function predicateBy(prop){
  return function(a,b){
     if( a[prop] < b[prop]){
         return 1;
     }else if( a[prop] > b[prop] ){
         return -1;
     }
     return 0;
  }
}

module.exports = function(app, db) { 
  app.post('/match/', (req, res) => {
    console.log("\n\rRequisicao Recebida:")
    console.log(req.body);

    let promiseProfessor = matchService(db, req.body.subjectId)
    let promiseStudent
    if (req.body.latitude == null && req.body.longitude == null) {
      promiseStudent = studentService(db,req.body.studentId);
    }
    else {
      // promiseStudent = "[ RowDataPacket {\n\r"
      //   +"UserId: "+ req.body.studentId+",\n\r"
      //   +"Latitude: "+ req.body.latitude+",\n\r"
      //   +"Longitude: "+ req.body.longitude +"} ]";
        promiseStudent = [ {
          UserId: req.body.studentId,
          Latitude: req.body.latitude,
          Longitude: req.body.longitude}];
      console.log(promiseStudent);
    }
      

    Promise.all([promiseStudent,promiseProfessor]).then(
      function(result){
        console.log("\n\rResultado Devolvido")
        console.log(result);

        console.log("\n\rAluno:")
        console.log(result[0]);
        //console.log(JSON.stringify(result[0]));
        let Aluno = JSON.parse(JSON.stringify(result[0]));
        console.log(Aluno);
        console.log(Aluno[0]);

        
        console.log("\n\rProfessor:")
        //console.log(result[1]);
        let Professor = JSON.parse(JSON.stringify(result[1]));
        Professor.forEach(function(professor)
          {console.log(professor);
            let d = distance(Aluno[0],professor);
            //let dPrice = Math.sqrt(Math.pow((professor.Price - req.body.MaxPrice),2));
            let score = (p1 * d) + (p2 * professor.Price) + (p3 * professor.Rating); 
            //Remoção dos professores fora da selecao
            //if(d > req.body.MaxDistance || professor.Price > req.body.MaxPrice){
            //  Professor = Professor.filter(function(el){
            //    return el.UserId !== professor.UserId
            //  })
            //}
            professor.Distance = d;
            professor.Score = score;
            delete professor.Latitude;
            delete professor.Longitude;     
          }
        )
        Professor.sort(predicateBy("Score"));
        console.log("ProfessoresFiltrados")
        console.log(Professor);
        //foreach (professor in Professor){
        //  console.log(professor);
        //}

        //console.log(Professor[1]);
        
        //console.log("\n\rDistance:")
        //console.log(distance(Aluno[0],Professor[0]))
        //console.log(distance(Aluno[0],Professor[1]))

        res.send({'req': Professor});
      }
    );
  })
}