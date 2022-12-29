import './App.css';
import { useRef } from 'react';
import useInterval from '@use-it/interval';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsParallelCoordinates from 'highcharts/modules/parallel-coordinates';
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsParallelCoordinates(Highcharts);

const TOTAL_LINE_COUNT = 100;

const data = Array(TOTAL_LINE_COUNT).fill(1).reduce((accumulator) => {
  accumulator.push([
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 90) + 10,
    Date.UTC(Math.floor(Math.random() * 20) + 2010),
    Date.UTC(2023, Math.floor(Math.random() * 12)),
    Date.UTC(2023, 0, 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 59), Math.floor(Math.random() * 59)),
    Math.floor(Math.random() * 4),
    Math.floor(Math.random() * 2),
  ]);
  return accumulator;
}, []);

const getOptions = () => ({
  chart: {
    type: 'spline',
    width: 800,
    height: 600,
    parallelCoordinates: true,
    parallelAxes: {
      lineWidth: 2,
    },
  },
  title: {
    text: 'Parallel Coordinates Chart',
  },
  plotOptions: {
    series: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
          },
        },
      },
      enableMouseTracking: false,
    },
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.formattedValue}</b><br/>',
  },
  xAxis: {
    categories: [
      'Linear Values',
      'Logarithmic Values',
      'Years',
      'Months',
      'Time',
      'Categories',
      'State',
    ],
    offset: 10,
  },
  yAxis: [
    {
      type: 'linear',
      min: 0,
      max: 10,
      startOnTick: false,
      reversed: true,
    },
    {
      type: 'logarithmic',
      min: 10,
      max: 100,
      reversed: true,
    },
    {
      type: 'datetime',
    },
    {
      type: 'datetime',
      min: Date.UTC(2023, 0),
      max: Date.UTC(2023, 11),
      tickInterval: 24 * 3600 * 1000 * 30,
      reversed: true,
      labels: {
        format: '{value:%B}',
      },
    },
    {
      type: 'datetime',
      reversed: true,
      labels: {
        format: '{value:%l:%M:%S %p}',
      },
    },
    {
      type: 'category',
      reversed: true,
      categories: ['A', 'B', 'C', 'D'],
    },
    {
      type: 'category',
      categories: ['False', 'True'],
    },
  ],
  series: data.map((set, i) => ({
    allowPointSelect: true,
    name: `Line ${i}`,
    data: set,
  })),
  credits: {
    enabled: false,
  },
});

function App() {
  const chartComponentRef = useRef(null);

  useInterval(() => {
    if (chartComponentRef.current) {
      const selected = Math.floor(Math.random() * TOTAL_LINE_COUNT);
      chartComponentRef.current.chart.series.forEach((series, index) =>
        series.setState(selected === index ? 'hover' : 'inactive')
      );
    }
  }, 1000);

  return <HighchartsReact highcharts={Highcharts} options={getOptions()} ref={chartComponentRef} />;

}

export default App;