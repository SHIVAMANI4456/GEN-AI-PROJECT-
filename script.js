function calculate() {

  let cr = parseFloat(document.getElementById("cr").value);
  let mixture = document.getElementById("mixture").value;
  let lhv = parseFloat(document.getElementById("lhv").value);
  let octane = parseFloat(document.getElementById("octane").value);
  let sulfur = parseFloat(document.getElementById("sulfur").value);

  let gamma = 1.4;

  // Otto efficiency
  let eta_otto = 1 - (1 / Math.pow(cr, gamma - 1));

  // Factors
  let combustion = mixture === "stoich" ? 0.95 : mixture === "lean" ? 0.90 : 0.85;
  let fuel_factor = (lhv / 44) * (octane / 100);
  let volatility = 0.90;

  let efficiency = eta_otto * combustion * fuel_factor * volatility * 100;

  // Emissions (simple model)
  let CO = mixture === "rich" ? 8 : mixture === "stoich" ? 2 : 0.5;
  let HC = (1 - combustion) * 100;
  let NOx = mixture === "lean" ? 7 : 5;
  let SO2 = sulfur / 100;

  // Quality index
  let quality = 10 - (CO * 0.2 + HC * 0.05 + NOx * 0.3 + SO2 * 0.1);
  if (quality < 0) quality = 0;

  // Effects
  let wear = sulfur > 50 ? "High" : "Low";
  let catalyst = sulfur > 30 ? "Risk" : "OK";
  let knock = octane < 90 ? "Yes" : "No";
  let powerLoss = (5 - quality).toFixed(2);

  // Display
  document.getElementById("eff").innerHTML = "Efficiency: " + efficiency.toFixed(2) + "%";
  document.getElementById("quality").innerHTML = "Exhaust Quality Index: " + quality.toFixed(2) + "/10";
  document.getElementById("effects").innerHTML =
    `Wear: ${wear}, Catalyst: ${catalyst}, Knock: ${knock}, Power Loss: ${powerLoss}%`;

  drawChart(CO, HC, NOx);
}
