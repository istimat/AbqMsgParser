
  function parseFile(evt) {
    var f = evt.target.files[0];   
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
          //var contents = e.target.result;             
          var ct = r.result;
          getChecks(ct);
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
      let check = new Check(incrementNr, averageF, timeAvgF, residualFV, residualFN, 
                                  incrDispV, incrDispN,
                                  corrDispV, corrDispN);
      createEntry = false;
      checks.push(check);

    }

}

//console.log(checks);
graphs(checks);

}

class Check {

  constructor(incrementNr, averageF, timeAvgF, residualFV, residualFN, 
                                  incrDispV, incrDispN,
                                  corrDispV, corrDispN){

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

function graphs(checks) {

var data = [];

for(var i = 0; i < checks.length; i++) {

  data.push({
    x:   checks[i].incrementNr,
    y: checks[i].corrDispV
});

}
console.log(data);

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