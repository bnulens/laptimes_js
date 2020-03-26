const lapCount = [];
const driverData = [];

const brechtData = [];
const lapTimesBrecht = [];

const woutData = [];
const lapTimesWout = []

const gertData = [];
const lapTimesGert = [];

Chart.defaults.global.defaultFontFamily = 'Formula1';
Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.defaultFontColor = '#999';
// Chart.defaults.line.spanGaps = true;

drawChart();
async function getData() {
    const timeSheet = await fetch('100_mijl_aug_2018.csv');
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
    
    driverData.push(brechtData, woutData, gertData)

    for (i = 0; i < driverData.length; i++) {
        // console.log(driverData[i])
        let innerArrayLength = driverData[i].length;
        for (j = 0; j < innerArrayLength; j++) {
            toMilli(driverData[i][j])
        }
    }

    function toMilli(i){
        const regExTime = /([0-9]?[0-9]):([0-9][0-9]).([0-9][0-9])/;
        const regExTimeArr = regExTime.exec(i);
        const timeMin = regExTimeArr[1] * 60 * 1000;
        const timeSec = regExTimeArr[2] * 1000;
        const timeMms = regExTimeArr[3];
        const totalMms = timeMin + timeSec + timeMms;
        console.log(totalMms)
        return totalMms
    }
    
} 

async function drawChart() {
    await getData();
    
    const ctx = document.getElementById('timingChart').getContext('2d');
    const timeFormat = 'mm:ss.SSS'
    
    const timeChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: lapCount,
            datasets: [{
                label: ['Brecht'],
                data: driverData,
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
            /* 
            {
                label: ['Wout'],
                data: lapTimeWout,
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
                data: lapTimeGert,
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
            */
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
                        labelString: 'Time',
                        color: 'white',
                        fontSize: 12
                    }
                }]
            }
        }
    });
}; 

