window.samCommon = window.samCommon || {};

$(document).ready(function () {

    function initChart1() {
        var s1 = [200, 600, 700, 1000];
        var s2 = [460, -210, 690, 820];
        var s3 = [-260, -440, 320, 200];
        // Can specify a custom tick Array.
        // Ticks should match up one for each y value (category) in the series.
        var ticks = ['May', 'June', 'July', 'August'];

        var plot1 = $.jqplot('chart1', [s1, s2, s3], {
            // The "seriesDefaults" option is an options object that will
            // be applied to all series in the chart.
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {fillToZero: true}
            },
            // Custom labels for the series are specified with the "label"
            // option on the series option.  Here a series option object
            // is specified for each series.
            series: [
                {label: 'Hotel'},
                {label: 'Event Regristration'},
                {label: 'Airfare'}
            ],
            // Show the legend and put it outside the grid, but inside the
            // plot container, shrinking the grid to accomodate the legend.
            // A value of "outside" would not shrink the grid and allow
            // the legend to overflow the container.
            legend: {
                show: true,
                placement: 'outsideGrid'
            },
            axes: {
                // Use a category axis on the x axis and use our custom ticks.
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                },
                // Pad the y axis just a little so bars can get close to, but
                // not touch, the grid boundaries.  1.2 is the default padding.
                yaxis: {
                    pad: 1.05,
                    tickOptions: {formatString: '$%d'}
                }
            }
        });
    }

    function initChart2() {
        // For horizontal bar charts, x an y values must will be "flipped"
        // from their vertical bar counterpart.
        var plot2 = $.jqplot('chart2', [
            [[2,1], [4,2], [6,3], [3,4]],
            [[5,1], [1,2], [3,3], [4,4]],
            [[4,1], [7,2], [1,3], [2,4]]], {
            seriesDefaults: {
                renderer:$.jqplot.BarRenderer,
                // Show point labels to the right ('e'ast) of each bar.
                // edgeTolerance of -15 allows labels flow outside the grid
                // up to 15 pixels.  If they flow out more than that, they
                // will be hidden.
                pointLabels: { show: true, location: 'e', edgeTolerance: -15 },
                // Rotate the bar shadow as if bar is lit from top right.
                shadowAngle: 135,
                // Here's where we tell the chart it is oriented horizontally.
                rendererOptions: {
                    barDirection: 'horizontal'
                }
            },
            axes: {
                yaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer
                }
            }
        });

    }

    function initChart3(){
        var s1 = [2, 6, 7, 10];
        var s2 = [7, 5, 3, 4];
        var s3 = [14, 9, 3, 8];
        plot3 = $.jqplot('chart3', [s1, s2, s3], {
            // Tell the plot to stack the bars.
            stackSeries: true,
            captureRightClick: true,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                rendererOptions: {
                    // Put a 30 pixel margin between bars.
                    barMargin: 30,
                    // Highlight bars when mouse button pressed.
                    // Disables default highlighting on mouse over.
                    highlightMouseDown: true
                },
                pointLabels: {show: true}
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer
                },
                yaxis: {
                    // Don't pad out the bottom of the data range.  By default,
                    // axes scaled as if data extended 10% above and below the
                    // actual range to prevent data points right on grid boundaries.
                    // Don't want to do that here.
                    padMin: 0
                }
            },
            legend: {
                show: true,
                location: 'e',
                placement: 'outside'
            }
        });
        // Bind a listener to the "jqplotDataClick" event.  Here, simply change
        // the text of the info3 element to show what series and ponit were
        // clicked along with the data for that point.
        $('#chart3').bind('jqplotDataClick',
            function (ev, seriesIndex, pointIndex, data) {
                $('#info3').html('series: '+seriesIndex+', point: '+pointIndex+', data: '+data);
            }
        );
    }

    initChart1();
    initChart2();
    initChart3();

});