
  function parseFile(evt) {
    var f = evt.target.files[0];   
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
          //var contents = e.target.result;             
          var ct = r.result;
          let checks = getChecks(ct);
          graphs(checks);
          countResidualIDs(checks)
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }

document.getElementById('fileinput').addEventListener('change', parseFile, false);



function getChecks(contents) {
  
  let lines = contents.split(/[\r\n]+/g);
  let insideIncrement = false;
  var createEntry = false;
  var checks = [];

  var stepNr = 0;
  var incrementNr = 0;
  var averageF = 0;
  var timeAvgF = 0;
  var residualFV = 0;
  var residualFN = 0;
  var incrDispV = 0;
  var incrDispN = 0;
  var corrDispV = 0;
  var corrDispN = 0;

  for(var i = 0; i < lines.length; i++) {

    if (lines[i].includes("S T E P ")) {
      var splitLine = lines[i].split(/[\s,]+/);
      stepNr = splitLine[5];

      //console.log("incrementNr: " + incrementNr);
      //console.log(lines[i].split(/[\s,]+/));
      //console.log("starts");
    }

    if (lines[i].includes("STARTS. ATTEMPT NUMBER")) {
      insideIncrement = true;
      var splitLine = lines[i].split(/[\s,]+/);
      incrementNr = splitLine[2];

      //console.log("incrementNr: " + incrementNr);
      //console.log(lines[i].split(/[\s,]+/));
      //console.log("starts");
    }

    if (insideIncrement == true && lines[i].includes("AVERAGE FORCE")){

      var splitLine = lines[i].split(/[\s,]+/);
      averageF = splitLine[3];
      timeAvgF = splitLine[7];
      //console.log(lines[i].split(/[\s,]+/));
      //console.log("averageF: " + averageF);
      //console.log("timeAvgF: " + timeAvgF);
      
    }

    if (insideIncrement == true && lines[i].includes("LARGEST RESIDUAL FORCE")){
      var splitLine = lines[i].split(/[\s,]+/);
      residualFV = splitLine[4];
      residualFN = splitLine[7];
      //TODO: add DOF
      //console.log(lines[i].split(/[\s,]+/));
      //console.log("residualFV: " + residualFV);
      //console.log("residualFN: " + residualFN);
    }

    if (insideIncrement == true && lines[i].includes("LARGEST INCREMENT OF DISP.")){
      var splitLine = lines[i].split(/[\s,]+/);
      incrDispV = splitLine[5];
      incrDispN = splitLine[8];
      //TODO: add DOF
      //console.log(lines[i].split(/[\s,]+/));
      //console.log("incrDispV: " + incrDispV);
      //console.log("incrDispN: " + incrDispN);
    }

    if (insideIncrement == true && lines[i].includes("LARGEST CORRECTION TO DISP.")){
      var splitLine = lines[i].split(/[\s,]+/);
      corrDispV = splitLine[5];
      corrDispN = splitLine[8];
      createEntry = true;
      //TODO: add DOF
      //console.log(lines[i].split(/[\s,]+/));
      //console.log("incrDispV: " + incrDispV);
      //console.log("incrDispN: " + incrDispN);
    }  

    if (createEntry) {
      let check = new Check(stepNr, incrementNr, averageF, timeAvgF, residualFV, residualFN, 
                                  incrDispV, incrDispN,
                                  corrDispV, corrDispN);
      createEntry = false;
      checks.push(check);

    }

}

//console.log(checks);
return checks;
}

class Check {

  constructor(stepNr, incrementNr, averageF, timeAvgF, residualFV, residualFN, 
                                  incrDispV, incrDispN,
                                  corrDispV, corrDispN){

  this.stepNr = stepNr;
  this.incrementNr = incrementNr;
  this.averageF = averageF;
  this.timeAvgF = timeAvgF;
  this.residualFV = residualFV;
  this.residualFN = residualFN;
  this.incrDispV = incrDispV;
  this.incrDispN = incrDispN;
  this.corrDispV = corrDispV;
  this.corrDispN = corrDispN;

}
}

//a, a, b, c, a, a, a, c.

function countResidualIDs(checks){

  residualIDs = [];

for(var i = 0; i < checks.length; i++) {
  var num = 0;
  var skip = false;

  for(var k = 0; k < residualIDs.length; k++){
      if (checks[i].residualFN == residualIDs[k]['x']){ skip = true; break;}
  }

  if (skip){ skip = false; continue;}

  for(var j = 0; j < checks.length; j++){
      
    if (checks[i].residualFN == checks[j].residualFN) { num++; }
  }

  residualIDs.push({
      x: checks[i].residualFN,
      y: num,
      z: "test"
      });
//console.log(checks[i].residualFN);
}
console.log(residualIDs);

}

function graphs(checks) {

var data = [];

for(var i = 0; i < checks.length; i++) {

  data.push({
    x:   checks[i].incrementNr,
    y: checks[i].corrDispV
});

}
//console.log(data);

new Chart("Residual", {
  type: "scatter",
  data: {
    datasets: [{
      pointRadius: 4,
      pointBackgroundColor: "rgb(0,0,255)",
      data: data
    }]
  },
  options: {
    legend: {display: false},
    //scales: {
    //  xAxes: [{ticks: {min: 40, max:160}}],
    //  yAxes: [{ticks: {min: 6, max:16}}],
    //}
  }
});


}