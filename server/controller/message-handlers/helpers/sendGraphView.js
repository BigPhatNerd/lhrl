const sendGraphView = (percentage) => {
    var chartColor;
    if(percentage <= 25) {
        chartColor = "red";
    } else if(percentage > 25 && percentage <= 50) {
        chartColor = "green";
    } else if(percentage > 50 && percentage <= 75) {
        chartColor = "blue";
    } else if(percentage > 75) {
        chartColor = "yellow";
    }
    const radialGauge = { type: 'radialGauge', data: { datasets: [{ data: [percentage], backgroundColor: chartColor }] } };
    const encodeRadialGauge = encodeURIComponent(JSON.stringify(radialGauge));

    const radialGaugeUrl = `https://quickchart.io/chart?c=${encodeRadialGauge}`;

    return radialGaugeUrl
}

module.exports = sendGraphView;