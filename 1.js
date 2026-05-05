function drawCRGraph() {

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
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let value = context.raw;

              let effect = "";
              if (value > 55) effect = "🔥 High efficiency → Better fuel economy";
              else if (value > 45) effect = "Normal efficiency";
              else effect = "⚠️ Low efficiency";

              return `Efficiency: ${value.toFixed(2)}% | ${effect}`;
            }
          }
        }
      }
    }
  });
}
