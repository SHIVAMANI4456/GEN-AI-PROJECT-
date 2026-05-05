function drawTempGraph() {

  let temp = [];
  let nox = [];

  for (let i = 20; i <= 120; i += 10) {
    temp.push(i);
    nox.push(i / 10);
  }

  new Chart(document.getElementById("tempGraph"), {
    type: 'line',
    data: {
      labels: temp,
      datasets: [{
        label: "NOx vs Temperature",
        data: nox
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let value = context.raw;

              let effect = "";
              if (value > 8) effect = "⚠️ High NOx → Engine overheating risk";
              else if (value > 5) effect = "Moderate NOx";
              else effect = "✅ Safe operation";

              return `NOx: ${value.toFixed(2)} | ${effect}`;
            }
          }
        }
      }
    }
  });
}
