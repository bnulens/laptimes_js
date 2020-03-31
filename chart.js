const lapCount = [];
const driverData = [];

const brechtData = [];
const lapTimesBrecht = [];

const woutData = [];
const lapTimesWout = [];

const gertData = [];
const lapTimesGert = [];

Chart.defaults.global.defaultFontFamily = 'Formula1';
Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.defaultFontColor = '#999';
// Chart.defaults.line.spanGaps = true;

drawChart();
async function getData() {
    const timeSheet = await fetch('100_mijl_aug_2018.csv', { mode: "no-cors"});
    const timingData = await timeSheet.text();

    const timeRows = timingData.split('\n').slice(1, -1);
    // console.log(timeRows);
    
    timeRows.forEach(r => {
        const row = r.split(';');
        lapCount.push(row[0]);
        brechtData.push(row[1]);
        woutData.push(row[2]);
        gertData.push(row[3]);
    });
    
    driverData.push(brechtData, woutData, gertData);

    function toMilli(i){
        const regExTime = /([0-9]?[0-9]):([0-9][0-9]).([0-9][0-9][0-9])/;
        const regExTimeArr = regExTime.exec(i);
        const timeMin = parseInt(regExTimeArr[1] * 60 * 1000, 10);
        const timeSec = parseInt(regExTimeArr[2] * 1000, 10);
        const timeMms = parseInt(regExTimeArr[3], 10);
        const totalMms = timeMin + timeSec + timeMms;
        return totalMms
    }
    
    for (i = 0; i < driverData.length; i++) {
        // console.log(driverData[i])
        let innerArrayLength = driverData[i].length;
        for (j = 0; j < innerArrayLength; j++) {
            driverData[i][j] = toMilli(driverData[i][j])
        }
    }
    return driverData
} 

async function drawChart() {
    const driverData = await getData();
    
    const ctx = document.getElementById('timingChart').getContext('2d');
    const timeFormat = 'mm:ss.SSS'
    
    const timeChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: lapCount,
            datasets: [{
                label: ['Brecht'],
                data: driverData[0],
                borderColor: ['#001eff'],
                borderWidth: 1,
                pointBorderColor: "#001eff",
                pointBackgroundColor: "#001eff",
                pointHoverBackgroundColor: "#001eff",
                pointHoverBorderColor: "#001eff",
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 5,
                pointRadius: 1,
                fill: false
            },
            {
                label: ['Wout'],
                data: driverData[1],
                borderColor: ['rgb(255, 174, 0)'],
                borderWidth: 1,
                pointBorderColor: "#ffae00",
                pointBackgroundColor: "#ffae00",
                pointHoverBackgroundColor: "#ffae00",
                pointHoverBorderColor: "#ffae00",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 5,
                pointRadius: 1,
                fill: false
            },
            {
                label: ['Gert'],
                data: driverData[2],
                borderColor: ['rgb(0, 255, 229)'],
                borderWidth: 1,
                pointBorderColor: "#00ffe5",
                pointBackgroundColor: "#00ffe5",
                pointHoverBackgroundColor: "#00ffe5",
                pointHoverBorderColor: "#00ffe5",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 5,
                pointRadius: 1,
                fill: false
            }
            ]
        },
        options: {
            beginAtZero: false,
            responsive: true,
            title: {
                display: true,
                text: '100 Miles Augustus 2018',
                fontSize: 25,
                fontColor: 'grey'
            },
            legend: {
                labels: {
                    fontColor: 'white',
                }
            },
            elements: {
                line: {
                    fill: false,
                    tension: 0
                }
            },
            scales: {
                xAxes: [{
                  display: true,
                  gridLines: {
                    display: false,
                    color: 'grey'
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Laps',
                    fontSize: 14
                  },
                  ticks: {
                    maxTicksLimit: 80
                  }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: true,
                    
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time (in mms)',
                        fontSize: 14
                    },
                    ticks: {
                        drawTicks: false,
                        min: 60000,
                        max: 100000
                    }
                }]
            }
        }
    });
}; 

