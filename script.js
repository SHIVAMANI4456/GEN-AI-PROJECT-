function drawRPMGraph() {

  let rpm = [];
  let co = [];

  for (let i = 1000; i <= 6000; i += 500) {
    rpm.push(i);
    co.push(10 - i / 800); // simple model
  }

  new Chart(document.getElementById("rpmGraph"), {
    type: 'line',
    data: {
      labels: rpm,
      datasets: [{
        label: "CO vs RPM",
        data: co
      }]
    },
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let value = context.raw;

              let effect = "";
              if (value > 6) effect = "⚠️ Rich combustion → High CO → Engine inefficiency";
              else if (value > 3) effect = "Moderate combustion → Acceptable";
              else effect = "✅ Efficient combustion";

              return `CO: ${value.toFixed(2)} | ${effect}`;
            }
          }
        }
      }
    }
  });
}
