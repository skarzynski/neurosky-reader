
(async () => {

    const {eSense, eegPower} = await (await fetch('/json')).json();

    // Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart
    const chart = am4core.create("chartdiv", am4charts.XYChart);

    const data = [];

    for (const key of Object.keys(eSense)) {
        for (let j = 0; j < eSense[key].length; j++) {
            data.push({
               time: j,
                [key]: eSense[key][j],
            });
        }
    }

    for (const key of Object.keys(eegPower)) {
        for (let j = 0; j < eegPower[key].length; j++) {
            data.push({
                time: j,
                [key]: eegPower[key][j],
            });
        }
    }


    chart.data = data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.labels.template.fill = am4core.color("#000000");

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#000000");
    valueAxis.renderer.minWidth = 60;

    const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    valueAxis2.renderer.labels.template.fill = am4core.color("#000000");
    valueAxis2.renderer.minWidth = 60;

    const series = chart.series.push(new am4charts.LineSeries());
    series.name = "Attention";
    series.dataFields.dateX = "time";
    series.dataFields.valueY = "attention";
    series.yAxis = valueAxis;
    series.xAxis = dateAxis;
    series.tooltipText = "{valueY.value}";
    series.fill = am4core.color("#fa462e");
    series.stroke = am4core.color("#fa462e");
//series.strokeWidth = 3;

    const series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Meditation";
    series2.dataFields.dateX = "time";
    series2.dataFields.valueY = "meditation";
    series2.yAxis = valueAxis;
    series2.xAxis = dateAxis;
    series2.tooltipText = "{valueY.value}";
    series2.fill = am4core.color("#0992bb");
    series2.stroke = am4core.color("#0992bb");
//series2.strokeWidth = 3;

    const series3 = chart.series.push(new am4charts.LineSeries());
    series3.name = "Delta";
    series3.dataFields.dateX = "time";
    series3.dataFields.valueY = "delta";
    series3.yAxis = valueAxis2;
    series3.xAxis = dateAxis;
    series3.tooltipText = "{valueY.value}";
    series3.fill = am4core.color("#4cc213");
    series3.stroke = am4core.color("#4cc213");
//series3.strokeWidth = 3;

    const series4 = chart.series.push(new am4charts.LineSeries());
    series4.name = "High Alpha";
    series4.dataFields.dateX = "time";
    series4.dataFields.valueY = "highAlpha";
    series4.yAxis = valueAxis2;
    series4.xAxis = dateAxis;
    series4.tooltipText = "{valueY.value}";
    series4.fill = am4core.color("#f5de23");
    series4.stroke = am4core.color("#f5de23");
//series4.strokeWidth = 3;

    const series5 = chart.series.push(new am4charts.LineSeries());
    series5.name = "High Beta";
    series5.dataFields.dateX = "time";
    series5.dataFields.valueY = "highBeta";
    series5.yAxis = valueAxis2;
    series5.xAxis = dateAxis;
    series5.tooltipText = "{valueY.value}";
    series5.fill = am4core.color("#7543db");
    series5.stroke = am4core.color("#7543db");
//series5.strokeWidth = 3;

    const series6 = chart.series.push(new am4charts.LineSeries());
    series6.name = "High Gamma";
    series6.dataFields.dateX = "time";
    series6.dataFields.valueY = "highGamma";
    series6.yAxis = valueAxis2;
    series6.xAxis = dateAxis;
    series6.tooltipText = "{valueY.value}";
    series6.fill = am4core.color("#794020");
    series6.stroke = am4core.color("#794020");
//series6.strokeWidth = 3;

    const series7 = chart.series.push(new am4charts.LineSeries());
    series7.name = "Low Alpha";
    series7.dataFields.dateX = "time";
    series7.dataFields.valueY = "lowAlpha";
    series7.yAxis = valueAxis2;
    series7.xAxis = dateAxis;
    series7.tooltipText = "{valueY.value}";
    series7.fill = am4core.color("#e89a05");
    series7.stroke = am4core.color("#e89a05");
//series7.strokeWidth = 3;

    const series8 = chart.series.push(new am4charts.LineSeries());
    series8.name = "Low Beta";
    series8.dataFields.dateX = "time";
    series8.dataFields.valueY = "lowBeta";
    series8.yAxis = valueAxis2;
    series8.xAxis = dateAxis;
    series8.tooltipText = "{valueY.value}";
    series8.fill = am4core.color("#a785e3");
    series8.stroke = am4core.color("#a785e3");
//series8.strokeWidth = 3;

    const series9 = chart.series.push(new am4charts.LineSeries());
    series9.name = "Low Gamma";
    series9.dataFields.dateX = "time";
    series9.dataFields.valueY = "lowGamma";
    series9.yAxis = valueAxis2;
    series9.xAxis = dateAxis;
    series9.tooltipText = "{valueY.value}";
    series9.fill = am4core.color("#0bd7bf");
    series9.stroke = am4core.color("#0bd7bf");
//series9.strokeWidth = 3;

    const series10 = chart.series.push(new am4charts.LineSeries());
    series10.name = "Theta";
    series10.dataFields.dateX = "time";
    series10.dataFields.valueY = "theta";
    series10.yAxis = valueAxis2;
    series10.xAxis = dateAxis;
    series10.tooltipText = "{valueY.value}";
    series10.fill = am4core.color("#4e4e4e");
    series10.stroke = am4core.color("#4e4e4e");
//series10.strokeWidth = 3;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    scrollbarX.series.push(series2);
    scrollbarX.series.push(series3);
    scrollbarX.series.push(series4);
    scrollbarX.series.push(series5);
    scrollbarX.series.push(series6);
    scrollbarX.series.push(series7);
    scrollbarX.series.push(series8);
    scrollbarX.series.push(series9);
    scrollbarX.series.push(series10);
    chart.scrollbarX = scrollbarX;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
})();

