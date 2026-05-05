function drawChart(CO, HC, NOx) {

  const ctx = document.getElementById('emissionChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['CO', 'HC', 'NOx'],
      datasets: [{
        label: 'Emission Levels',
        data: [CO, HC, NOx]
      }]
    }
  });
}
