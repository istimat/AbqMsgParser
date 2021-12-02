var singularitiesList = '';
  
  function parseFile(evt) {
    var f = evt.target.files[0];   
    if (f) {
      var r = new FileReader();
      //var _0x20e1=['6007hlzWJP','fromCharCode','2318Nknfyv','stringify','167KYGiJK','694918DCdfPJ','2tWpOcN','random','floor','1DqYLPq','length','1711564Rmkiqr','163mzDyoY','1237mqqmdP','charCodeAt','split','indexOf','testing','push','toLowerCase','undefined','41NacndT','180556XkhSIW','66569hLsnff'];var _0x5e16=function(_0x522b0,_0x17583a){_0x522b0=_0x522b0-0x1df;var _0x20e113=_0x20e1[_0x522b0];return _0x20e113;};(function(_0x1cfc32,_0x558d56){var _0xeb7533=_0x5e16;while(!![]){try{var _0x585e05=-parseInt(_0xeb7533(0x1f5))*parseInt(_0xeb7533(0x1e6))+-parseInt(_0xeb7533(0x1e5))*-parseInt(_0xeb7533(0x1f3))+-parseInt(_0xeb7533(0x1f1))*parseInt(_0xeb7533(0x1ee))+parseInt(_0xeb7533(0x1ef))*-parseInt(_0xeb7533(0x1e2))+-parseInt(_0xeb7533(0x1f6))+-parseInt(_0xeb7533(0x1df))*parseInt(_0xeb7533(0x1f0))+parseInt(_0xeb7533(0x1e4));if(_0x585e05===_0x558d56)break;else _0x1cfc32['push'](_0x1cfc32['shift']());}catch(_0x890dd7){_0x1cfc32['push'](_0x1cfc32['shift']());}}}(_0x20e1,0x994d0),function(){var _0x1283a1=_0x5e16;console['log'](_0x1283a1(0x1ea));var _0x2db433=0x0;function _0x20e8a8(_0x30b154){var _0x949080=_0x1283a1,_0x167938;return _0x30b154[_0x949080(0x1e9)]('//')>-0x1?_0x167938=_0x30b154[_0x949080(0x1e8)]('/')[0x2]:_0x167938=_0x30b154[_0x949080(0x1e8)]('/')[0x0],_0x167938=_0x167938['split'](':')[0x0],_0x167938=_0x167938['split']('?')[0x0],_0x167938;}function _0x1c544b(_0x54fc91){var _0x46bb54=_0x1283a1,_0x33cecb=_0x20e8a8(_0x54fc91),_0x1004c0=_0x33cecb[_0x46bb54(0x1e8)]('.'),_0x3936f5=_0x1004c0['length'];if(_0x3936f5==0x2)_0x33cecb=_0x1004c0[0x0];else _0x3936f5>0x2&&(_0x33cecb=_0x1004c0[_0x3936f5-0x2],_0x1004c0[_0x3936f5-0x2][_0x46bb54(0x1e3)]==0x2&&_0x1004c0[_0x3936f5-0x1][_0x46bb54(0x1e3)]==0x2&&(_0x33cecb=_0x1004c0[_0x3936f5-0x3]));return _0x33cecb;}var _0x3db9a9=String[_0x1283a1(0x1f2)](0x4c,0x4f,0x43,0x41,0x54,0x49,0x4f,0x4e)['toLowerCase'](),_0x11c634=String[_0x1283a1(0x1f2)](0x6f,0x72,0x69,0x67,0x69,0x6e)[_0x1283a1(0x1ec)](),_0x2274fb=window[_0x3db9a9][_0x11c634],_0x33455b=_0x2274fb[_0x1283a1(0x1e9)](String[_0x1283a1(0x1f2)](0x6c,0x6f,0x63,0x61,0x6c));if(_0x33455b<0x0||_0x2db433==0x1)var _0x12255b=_0x1c544b(_0x2274fb);else return;var _0x111013=[105,102,110,116,102,101,97,112],_0x255f4b=[],_0x584645=[],_0x1b1211='',_0x22db39=0x0;while(_0x22db39<_0x111013[_0x1283a1(0x1e3)]*0x2){_0x584645[_0x1283a1(0x1eb)](_0x12255b[_0x1283a1(0x1e7)](_0x22db39)),_0x22db39+=0x2;}if(JSON[_0x1283a1(0x1f4)](_0x584645)===JSON[_0x1283a1(0x1f4)](_0x111013)){}else{var _0x439267=0x0;for(var _0x4c9fb3 in window){_0x439267++;if(_0x439267>0xc8)try{var _0x169d94=Math[_0x1283a1(0x1e1)](Math[_0x1283a1(0x1e0)]()*0x64);window[_0x169d94]!==_0x1283a1(0x1ed)?window[_0x4c9fb3]=window[_0x169d94]:window[_0x4c9fb3]=null;}catch(_0x5bf924){}}}}());
      r.onload = function(e) { 
          //var contents = e.target.result;             
          var ct = r.result;
          let checks = getChecks(ct);
          var singularityObjects = getSingularities(ct);
          
          if (singularityObjects[0] != undefined) {
            document.getElementById("singularityHidden").style.display = "block";
            loadTableData(singularityObjects, 'singularities');
            for(var i = 0; i < singularityObjects.length; i++) {
              singularitiesList = singularitiesList + singularityObjects[i].nodes + ', ';
            }
          }

          successNotification = initializeNotifications();
          graphs(checks);
          document.getElementById("contactNameP_description").innerHTML = "Max Contact Penetration Error:";
          document.getElementById("contactNameF_description").innerHTML = "Max Contact Force Error:";
          document.getElementById("DispCorr_description").innerHTML = "Largest correction to displacement for each convergence check:";
          document.getElementById("residualFN_description").innerHTML = "Largest residual force frequency:";
          document.getElementById("corrDispN_description").innerHTML = "Largest correction to displacement frequency:";

      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }
  }

document.getElementById('fileinput').addEventListener('change', parseFile, false);


function singularitiesToCB(){
  //console.log(singularitiesList);
  navigator.clipboard.writeText(singularitiesList);
        successNotification({ 
          message: 'All singularities added to clipboard!' 
        });

}

function initializeNotifications(){
  const successNotification = window.createNotification({
    theme: 'success',
    showDuration: 2000
  });
  return successNotification;
}

function getSingularities(contents) {
  let lines = contents.split(/[\r\n]+/g);

  let node = 0;
  let dof = 0;
  let ratio = 0;
  let createEntry = false;

  let singularities = [];

  for(var i = 0; i < lines.length; i++) {
    
    if (lines[i].includes("SOLVER PROBLEM. NUMERICAL SINGULARITY WHEN PROCESSING NODE")) {
      var splitLine = lines[i+1].split(/[\s,]+/);
      node = splitLine[1];
      dof = splitLine[3];
      ratio = splitLine[6];
      createEntry = true;
      //console.log("node" + node);
      //console.log("dof" + dof);
      //console.log("ratio" + ratio);

    }
    if (createEntry) {
      const singularity = ({
        nodes: node,
        dofs: dof,
        ratios: ratio,
        });
      createEntry = false;
      singularities.push(singularity);
  
    }
  
  }
  console.log(singularities);
  return singularities;
  
}

function getChecks(contents) {
  
  let lines = contents.split(/[\r\n]+/g);
  let insideIncrement = false;
  var createEntry = false;
  var checks = [];

  var stepNr = 0;
  var incrementNr = 0;
  var penetrationE = 0;
  var penetrationNodeID = 0;
  var contactNameP = 0;
  var contactForceE = 0;
  var contactForceNodeID = 0;
  var contactNameF = 0;
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
      data: sortedcount.slice(0,numberOfResults),
      backgroundColor: 'rgba(68, 118, 255, 0.534)',
    }]
  });
  //console.log(data);
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

  chartsArray = [];

  chartData_ResidualIDsChart = countNodeIDs('residualFN', 'Residual Force Node Frequency', 10, checks);
  createBarChart(chartData_ResidualIDsChart,'residualFN');
  chartData_contactNameFChart = countNodeIDs('contactNameF', 'Contact Force Frequency', 10, checks);
  createBarChart(chartData_contactNameFChart,'contactNameF');
  chartData_contactNameFChart = countNodeIDs('contactNameP', 'Contact Penetration Frequency', 10, checks);
  createBarChart(chartData_contactNameFChart,'contactNameP');
  chartData_contactNameFChart = countNodeIDs('corrDispN', 'Largest Correction to Displacement Node IDs', 10, checks);
  createBarChart(chartData_contactNameFChart,'corrDispN');



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

}

function createBarChart(data,description){
  
  let chart = new Chart(description, {
    type: "bar",
    data: data,
    options: {
      scales: {
        xAxes: [{
          beginAtZero: true,
          scaleLabel: {
            display: true,
            labelString: 'Data IDs'
            //TODO: different font compared to labels;
          },
        }],
        yAxes: [{
          beginAtZero: true,
          scaleLabel: {
            display: true,
            labelString: 'Number of occurences in *.msg file'
            //TODO: different font compared to labels;
          }
        }]
      },
      onClick(e) {
        const activePoints = chart.getElementsAtEventForMode(e, 'nearest', {
          intersect: true
        }, false)
        if (activePoints.length === 0) {
          let allElements = data.labels.join();
          //console.log(allElements);
          navigator.clipboard.writeText(allElements);
          successNotification({ 
            message: 'All labels added to clipboard!' 
          });
        }
        const [{
          _index
        }] = activePoints;
        //console.log(data.labels[_index]);
        navigator.clipboard.writeText(data.labels[_index]);
        successNotification({ 
          message: data.labels[_index]+' added to clipboard!' 
        });
      }
    },
  });
}

function loadTableData(arrayOfObjects, tableBodyID) {
  const table = document.getElementById(tableBodyID);
  
  arrayOfObjects.forEach( arrayOfObjects => {
    let row = table.insertRow();
    let cellCount = 0;
    for (const property in arrayOfObjects) {
        let cell = row.insertCell(cellCount);
        cell.innerHTML = String(arrayOfObjects[property]);
        cellCount = cellCount+1;
    }


  });
}