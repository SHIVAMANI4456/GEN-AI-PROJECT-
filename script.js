function runModel() {

  let cr = parseFloat(document.getElementById("cr").value);
  let afr = parseFloat(document.getElementById("afr").value);
  let temp = parseFloat(document.getElementById("temp").value);
  let octane = parseFloat(document.getElementById("octane").value);
  let lhv = parseFloat(document.getElementById("lhv").value);
  let sulfur = parseFloat(document.getElementById("sulfur").value);
  let fuel = document.getElementById("fuel").value;

  let gamma = 1.4;

  // Efficiency
  let eta = 1 - (1 / Math.pow(cr, gamma - 1));
  let fuelFactor = (lhv / 44) * (octane / 100);
  let efficiency = eta * fuelFactor * 0.9 * 100;

  // Emissions based on AFR
  let CO = afr < 14.7 ? 8 - afr/2 : 1;
  let HC = afr < 14.7 ? 6 : 2;
  let NOx = afr > 14.7 ? (temp / 50) : 3;
  let SO2 = sulfur / 100;

  // Quality Index
  let quality = 10 - (CO*0.2 + HC*0.3 + NOx*0.2 + SO2*0.1);
  if (quality < 0) quality = 0;

  // Engine Effects
  let wear = sulfur > 50 ? "High" : "Low";
  let catalyst = sulfur > 30 ? "Risk" : "OK";
  let knock = octane < 90 ? "Yes" : "No";
  let powerLoss = (5 - quality).toFixed(2);

  // Recommendation
  let rec = "";
  if (CO > 5) rec += "Reduce rich mixture. ";
  if (NOx > 6) rec += "Use EGR to reduce NOx. ";
  if (sulfur > 30) rec += "Use low sulfur fuel. ";

  // Output
  document.getElementById("eff").innerHTML = "Efficiency: " + efficiency.toFixed(2) + "%";
  document.getElementById("quality").innerHTML = "Exhaust Quality Index: " + quality.toFixed(2) + "/10";
  document.getElementById("pollutants").innerHTML =
    `CO: ${CO.toFixed(2)}, HC: ${HC.toFixed(2)}, NOx: ${NOx.toFixed(2)}`;
  document.getElementById("effects").innerHTML =
    `Wear: ${wear}, Catalyst: ${catalyst}, Knock: ${knock}, Power Loss: ${powerLoss}%`;
  document.getElementById("recommend").innerHTML = "Suggestions: " + rec;

  drawBar(CO, HC, NOx);
  drawAFR();
  drawCR();
}

// BAR GRAPH
function drawBar(CO, HC, NOx) {
  new Chart(document.getElementById("emissionBar"), {
    type: 'bar',
    data: {
      labels: ["CO", "HC", "NOx"],
      datasets: [{
        label: "Emissions",
        data: [CO, HC, NOx]
      }]
    }
  });
}

// AFR vs Emission GRAPH
function drawAFR() {
  let afr = [];
  let co = [];
  let nox = [];

  for (let i = 10; i <= 20; i++) {
    afr.push(i);
    co.push(i < 14.7 ? 8 - i/2 : 1);
    nox.push(i > 14.7 ? i/2 : 2);
  }

  new Chart(document.getElementById("afrGraph"), {
    type: 'line',
    data: {
      labels: afr,
      datasets: [
        { label: "CO", data: co },
        { label: "NOx", data: nox }
      ]
    }
  });
}

// CR vs Efficiency GRAPH
function drawCR() {
  let cr = [];
  let eff = [];

  for (let i = 6; i <= 14; i++) {
    cr.push(i);
    eff.push((1 - (1 / Math.pow(i, 0.4))) * 100);
  }

  new Chart(document.getElementById("crGraph"), {
    type: 'line',
    data: {
      labels: cr,
      datasets: [{
        label: "Efficiency",
        data: eff
      }]
    }
  });
}
