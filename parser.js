
  function parseFile(evt) {
    var f = evt.target.files[0];   
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
          //var contents = e.target.result;             
          var ct = r.result;
          let checks = getChecks(ct);
          graphs(checks);
          //countResidualIDs(checks);
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


function countResidualIDs(checks){

  let labels = [];
  let count = [];

for(var i = 0; i < checks.length; i++) {
  var num = 0;
  var skip = false;

  for(var k = 0; k < labels.length; k++){
      if (checks[i].residualFN == labels[k]){ skip = true; break;}
  }

  if (skip){ skip = false; continue;}

  for(var j = 0; j < checks.length; j++){
      
    if (checks[i].residualFN == checks[j].residualFN) { num++; }
  }

  labels.push(checks[i].residualFN);
  count.push(num);

}

var retrieve = sortDescending(labels, count);
sortedlabels = retrieve[0]; 
sortedcount = retrieve[1];

const residualIDs = ({
      labels: sortedlabels,
      datasets: [{
        label: 'Residual Force Nodes',
        data: sortedcount
        }]
      });
console.log(residualIDs);
    return residualIDs;
}

function countCorrDispIDs(checks){

  let labels = [];
  let count = [];

for(var i = 0; i < checks.length; i++) {
  var num = 0;
  var skip = false;

  for(var k = 0; k < labels.length; k++){
      if (checks[i].corrDispN == labels[k]){ skip = true; break;}
  }

  if (skip){ skip = false; continue;}

  for(var j = 0; j < checks.length; j++){
      
    if (checks[i].corrDispN == checks[j].corrDispN) { num++; }
  }

  labels.push(checks[i].corrDispN);
  count.push(num);

}


var retrieve = sortDescending(labels, count);
sortedlabels = retrieve[0]; 
sortedcount = retrieve[1];

const corrDispNIDs = ({
      labels: sortedlabels,
      datasets: [{
        label: 'Largest Correction to Displacement Node IDs',
        data: sortedcount
        }]
      });

console.log(corrDispNIDs);
    return corrDispNIDs;
}

function sortDescending(labels, counts){
  var max = 0;
  sortedLabels = [];
  sortedCount = [];
  k = 0;
  var location = 0;
  if (labels.length != counts.length) {
    console.log("Error! Data set unsymmetrical!");
  }

  for(var i = 0; i < counts.length; i++){

    for(var j = 0; j < counts.length; j++){
      if (counts[j] > max && counts[j] != 0) {
        max = counts[j];
        location = j;
      }
    }
    counts[location] = 0;
    sortedCount[k] = max;
    sortedLabels[k] = labels[location];
    k++;
    max = 0;
    
  }

  console.log(sortedLabels);
  console.log(sortedCount);
  
  return [
     sortedLabels,
     sortedCount,
    ];
}

function corrDispData(checks) {

  var data = [];

  for(var i = 0; i < checks.length; i++) {

    data.push({
      x:   checks[i].incrementNr,
      y: checks[i].corrDispV
      });

  

  }
  return data;
  }


function graphs(checks) {

  
new Chart("DispCorr", {
  type: "scatter",
  data: {
    datasets: [{
      pointRadius: 4,
      pointBackgroundColor: "rgb(0,0,255)",
      data: corrDispData(checks)
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

//console.log(countResidualIDs(checks));

new Chart("ResidualIDs", {
  type: "bar",
  data: countResidualIDs(checks),
  options: {
    scales: {
      y: {
        beginAtZero: true
          }
    }
  },
});

new Chart("corrDispIDs", {
  type: "bar",
  data: countCorrDispIDs(checks),
  options: {
    scales: {
      y: {
        beginAtZero: true
          }
    }
  },
});

}
