const sendGraphView = (percentage) => {

    const radialGauge = { type: 'radialGauge', data: { datasets: [{ data: [percentage], backgroundColor: 'blue' }] } };
    const encodeRadialGauge = encodeURIComponent(JSON.stringify(radialGauge));

    const radialGaugeUrl = `https://quickchart.io/chart?c=${encodeRadialGauge}`;

    return radialGaugeUrl
}

module.exports = sendGraphView;