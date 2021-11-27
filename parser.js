
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

    if (insideIncrement == true && lines[i].includes("MAX. PENETRATION ERROR")){

      var splitLine = lines[i].split(/[\s,]+/);
      penetrationE = splitLine[4];
      penetrationNodeID = splitLine[7];
      contactNameP = lines[i+1].replace(/(\r\n|\n|\r|\s|\(|\))/gm,"");;
      //console.log("contactName: " + contactName);
      //console.log("penetrationE: " + penetrationE);
      //console.log("penetrationNodeID: " + penetrationNodeID);
      
    }

    if (insideIncrement == true && lines[i].includes("MAX. CONTACT FORCE ERROR")){

      var splitLine = lines[i].split(/[\s,]+/);
      contactForceE = splitLine[4];
      contactForceNodeID = splitLine[7];
      contactNameF = lines[i+1].replace(/(\r\n|\n|\r|\s|\(|\))/gm,"");;
      //console.log("contactName: " + contactName);
      //console.log("penetrationE: " + penetrationE);
      //console.log("penetrationNodeID: " + penetrationNodeID);
      
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
      let check = new Check(stepNr, incrementNr, 
              penetrationE, penetrationNodeID, contactNameP, 
              contactForceE, contactForceNodeID, contactNameF,
              averageF, timeAvgF, 
              residualFV, residualFN, 
              incrDispV, incrDispN,
              corrDispV, corrDispN);
      createEntry = false;
      checks.push(check);

    }

}

return checks;
}

class Check {

  constructor(stepNr, incrementNr, 
              penetrationE, penetrationNodeID, contactNameP, 
              contactForceE, contactForceNodeID, contactNameF,
              averageF, timeAvgF, 
              residualFV, residualFN, 
              incrDispV, incrDispN,
              corrDispV, corrDispN){

  this.stepNr = stepNr;
  this.incrementNr = incrementNr;
  this.penetrationE = penetrationE;
  this.penetrationNodeID = penetrationNodeID;
  this.contactNameP = contactNameP;
  this.contactForceE = contactForceE;
  this.contactForceNodeID = contactForceNodeID;
  this.contactNameF = contactNameF;
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


function countNodeIDs(property, label, numberOfResults, checks){

  let labels = [];
  let count = [];

  for(var i = 0; i < checks.length; i++) {
    var num = 0;
    var skip = false;

    for(var k = 0; k < labels.length; k++){
      if (checks[i][property] == labels[k]){ skip = true; break;}
    }

    if (skip){ skip = false; continue;}

    for(var j = 0; j < checks.length; j++){
      
      if (checks[i][property] == checks[j][property]) { num++; }
    }

    labels.push(checks[i][property]);
    count.push(num);

  }

  var retrieve = sortDescending(labels, count);
  sortedlabels = retrieve[0]; 
  sortedcount = retrieve[1];

  const data = ({
      labels: sortedlabels.slice(0,numberOfResults),
      datasets: [{
        label: label,
        data: sortedcount.slice(0,numberOfResults)
        }]
      });
  console.log(data);
  return data;
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

  //console.log(sortedLabels);
  //console.log(sortedCount);
  
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

    chartData_contactNamePChart = countNodeIDs('contactNameP', 'Contact Penetration Frequency', 10, checks);

    contactNamePChart = new Chart("contactNameP", {
    type: "bar",
    data: chartData_contactNamePChart,
    options: {
      scales: {
        y: {
          beginAtZero: true
            }
      },
      onClick(e) {
        const activePoints = contactNamePChart.getElementsAtEventForMode(e, 'nearest', {
        intersect: true
      }, false)
      const [{
        _index
      }] = activePoints;
      console.log(chartData_contactNamePChart.labels[_index]);
      navigator.clipboard.writeText(chartData_contactNamePChart.labels[_index]);
      }
    },
  });

    chartData_contactNameFChart = countNodeIDs('contactNameF', 'Contact Penetration Frequency', 10, checks);

    contactNameFChart = new Chart("contactNameF", {
    type: "bar",
    data: chartData_contactNameFChart,
    options: {
      scales: {
        y: {
          beginAtZero: true
            }
      },
      onClick(e) {
        const activePoints = contactNameFChart.getElementsAtEventForMode(e, 'nearest', {
        intersect: true
      }, false)
      const [{
        _index
      }] = activePoints;
      console.log(chartData_contactNameFChart.labels[_index]);
      navigator.clipboard.writeText(chartData_contactNameFChart.labels[_index]);
      }
    },
  });


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

  chartData_ResidualIDsChart = countNodeIDs('residualFN', 'Residual Force Node Frequency', 10, checks);

  ResidualIDsChart = new Chart("residualFN", {
    type: "bar",
    data: chartData_ResidualIDsChart,
    options: {
      scales: {
        y: {
          beginAtZero: true
            }
      },
      onClick(e) {
        const activePoints = ResidualIDsChart.getElementsAtEventForMode(e, 'nearest', {
        intersect: true
      }, false)
      const [{
        _index
      }] = activePoints;
      console.log(chartData_ResidualIDsChart.labels[_index]);
      navigator.clipboard.writeText(chartData_ResidualIDsChart.labels[_index]);
      }
    },
  });

  chartData_corrDispIDsChart = countNodeIDs('corrDispN', 'Largest Correction to Displacement Node IDs', 10, checks);

  corrDispIDsChart = new Chart("corrDispN", {
    type: "bar",
    data: chartData_corrDispIDsChart,
    options: {
      scales: {
        y: {
          beginAtZero: true
            }
      },
      onClick(e) {
        const activePoints = corrDispIDsChart.getElementsAtEventForMode(e, 'nearest', {
        intersect: true
      }, false)
      const [{
        _index
      }] = activePoints;
      console.log(chartData_corrDispIDsChart.labels[_index]);
      navigator.clipboard.writeText(chartData_corrDispIDsChart.labels[_index]);
      }
    },
  });

}
