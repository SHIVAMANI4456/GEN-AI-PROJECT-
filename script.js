function runModel() {

  let rpm = parseFloat(document.getElementById("rpm").value);
  let temp = parseFloat(document.getElementById("temp").value);
  let cr = parseFloat(document.getElementById("cr").value);

  // Efficiency
  let efficiency = (1 - (1 / Math.pow(cr, 0.4))) * 100;

  // Quality
  let quality = 10 - (rpm/2000 + temp/50);
  if (quality < 0) quality = 0;

  // Effects
  let effect = rpm > 4000 ? "High Wear" : "Normal";

  document.getElementById("eff").innerHTML = "Efficiency: " + efficiency.toFixed(2) + "%";
  document.getElementById("quality").innerHTML = "Exhaust Quality: " + quality.toFixed(2) + "/10";
  document.getElementById("effects").innerHTML = "Engine Effect: " + effect;

  drawRPMGraph();
  drawTempGraph();
  drawCRGraph();
}

// RPM Graph
function drawRPMGraph() {
  let rpm = [], co = [];

  for (let i=1000;i<=6000;i+=500){
    rpm.push(i);
    co.push(10 - i/800);
  }

  new Chart(document.getElementById("rpmGraph"), {
    type:'line',
    data:{labels:rpm,datasets:[{label:"CO vs RPM",data:co}]}
  });
}

// Temp Graph
function drawTempGraph() {
  let temp = [], nox = [];

  for (let i=20;i<=120;i+=10){
    temp.push(i);
    nox.push(i/10);
  }

  new Chart(document.getElementById("tempGraph"), {
    type:'line',
    data:{labels:temp,datasets:[{label:"NOx vs Temp",data:nox}]}
  });
}

// CR Graph
function drawCRGraph() {
  let cr = [], eff = [];

  for (let i=6;i<=14;i++){
    cr.push(i);
    eff.push((1-(1/Math.pow(i,0.4)))*100);
  }

  new Chart(document.getElementById("crGraph"), {
    type:'line',
    data:{labels:cr,datasets:[{label:"Efficiency",data:eff}]}
  });
}
