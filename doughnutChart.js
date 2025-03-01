let ctx = null;
let doughnutChart = null;

function drawDonutChart() {

    let astroDataList = DataList.reverse();
    // -------------------------------------

    // Zodiac
    const resultObj = astroDataList.reduce((acc, item) => {
        if (!acc[item.Zodiac]) {
            acc[item.Zodiac] = 0;
        }
        acc[item.Zodiac] += item.DegreeSapn;
        return acc;
    }, {});


    let ZodiacLabelsList = [...new Set(astroDataList.map(item => item.Zodiac))];
    let ZodiacValueList = Object.values(resultObj);

    // Nakshtra
    const resultObj_Nakshtra = astroDataList.reduce((acc, item) => {
        if (!acc[item.Nakshtra]) {
            acc[item.Nakshtra] = 0;
        }
        acc[item.Nakshtra] += item.DegreeSapn;
        return acc;
    }, {});


    let NakshtraLabelsList = [...new Set(astroDataList.map(item => item.Nakshtra))];
   // let NakshtraBgColorList = [...new Set(astroDataList.map(item => item.NakshtraColor))];
    let NakshtraValueList = Object.values(resultObj_Nakshtra);

    //--------------------------------------------------------------------------------------------------------------

    // donutChart.js
    ctx = document.getElementById('doughnutChart').getContext('2d');
    doughnutChart = new Chart(ctx, {
        type: 'doughnut',  // 'doughnut' for a donut chart
        plugins: [ChartDataLabels],
        data: {
            datasets: [
                {
                    label: 'Nakshtra',
                    labels: NakshtraLabelsList,
                    data: NakshtraValueList,
                    cutout: '25%'  
                },
                {
                    label: 'Nakshtra Pada',
                    labels: astroDataList.map(v => v.Pada.split("-")[1].substring(1, 2)),
                    //labels: astroDataList.map(v => ''),
                    data: astroDataList.map(v => v.DegreeSapn),
                    cutout: '35%' 
                },
                {
                    label: 'House2',
                    labels: [1,2,3,4,5,6,7,8,9,10,11,12].reverse(),
                    backgroundColor: ['#B4B4B8','#E3E1D9','#E3E1D9','#E3E1D9','#B4B4B8','#E3E1D9','#E3E1D9','#E3E1D9','#B4B4B8','#E3E1D9','#E3E1D9','#E3E1D9'].reverse(),
                    data: ZodiacValueList,
                    cutout: '39%'  ,
                    rotation: +15,
                },
                {
                    label: 'Zodiac',
                    labels: ZodiacLabelsList,
                    data: ZodiacValueList,
                    cutout: '39%' ,
                    backgroundColor: [
                        'rgb(216, 64, 64)',
                        'rgb(247, 168, 196)',
                        'rgb(184, 213, 118)',
                        'rgb(244, 247, 247)',
                        'rgb(255, 171, 91)',
                        'rgb(119, 178, 84)',
                        'rgb(229, 56, 136)',
                        'rgb(96, 100, 112)',
                        'rgb(255, 157, 35)',
                        'rgb(96, 139, 193)',
                        'rgb(183, 183, 183)',
                        'rgb(152, 216, 239)'
                    ].reverse(),
                }
            ]
        },
        options: {

            responsive: true,
            plugins: {
                tooltip: {
                    enabled: false, // Disable tooltips
                },
                datalabels: {
                    anchor: 'center',
                    align: 'center',
                    offset: 50,
                    formatter: (val, ctx) => {
                        var index = ctx.dataIndex;
                        return ctx.dataset.labels[index];
                    },
                    labels: {
                        title: {
                            color: 'black'
                        }
                    }
                }
            }
        }
    });


    doughnutChart.options.rotation = 15;
    doughnutChart.update(); 

    // Listen for click events on the canvas
    ctx.canvas.addEventListener('click', function(event) {
        var activePoints = doughnutChart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

        if (activePoints.length > 0) {
            var firstPoint = activePoints[0];
            var clickedIndex = firstPoint.index;
            var datasetIndex = firstPoint.datasetIndex;

            var dataLenght = doughnutChart.getDatasetMeta(datasetIndex).data.length;
            //console.log(doughnutChart.getDatasetMeta(datasetIndex).data);

            let rotation = 0;
            if(dataLenght == 12){
                rotation = 0 - clickedIndex*30 -15;
            }else if(dataLenght == 27){
                rotation = 0 - clickedIndex*(360/dataLenght)-8.5;
            }else if(dataLenght == 108){
                rotation = 0 - clickedIndex*(360/dataLenght)-1.5;
            }
            //var rotation = dataLenght > 12 ? 0 - firstPoint.index*(360/dataLenght)-8 : 0 - firstPoint.index*30 -15;
           // console.log(firstPoint);

            doughnutChart.options.rotation = rotation;
            doughnutChart.update();
        }
    });    

}



