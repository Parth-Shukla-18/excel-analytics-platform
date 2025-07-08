import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ExcelChartWithTypes = () => {
  const [headers, setHeaders] = useState([]);
  const [dataRows, setDataRows] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [chartData, setChartData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headersFromFile = jsonData[0];
      const rows = jsonData.slice(1);

      setHeaders(headersFromFile);
      setDataRows(rows);
      setXAxis('');
      setYAxis('');
      setChartData(null);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleGenerateChart = () => {
    if (!xAxis || !yAxis) return;

    const xIndex = headers.indexOf(xAxis);
    const yIndex = headers.indexOf(yAxis);

    const labels = dataRows.map(row => row[xIndex]);
    const values = dataRows.map(row => row[yIndex]);

    const data = {
      labels,
      datasets: [
        {
          label: yAxis,
          data: values,
          backgroundColor: chartType === 'pie'
            ? ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            : 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  };

  const renderChart = () => {
    if (!chartData) return null;

    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} />;
      case 'line':
        return <Line data={chartData} />;
      case 'pie':
        return <Pie data={chartData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Excel to Chart Visualizer</h2>

        <div className="mb-6">
          {/* <label className="block text-gray-600 font-medium mb-2">Drop your Excel file here </label> */}
          <label className="bg-gray-200 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-600 cursor-pointer focus-within:ring-2 focus-within:ring-blue-400">
  📁 Choose your file
  <input
    type="file"
    accept=".xlsx, .xls"
    onChange={handleFileUpload}
    className="hidden"
  />
</label>
        </div>

        {headers.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Select X Axis</label>
                <select
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select --</option>
                  {headers.map((header, index) => (
                    <option key={index} value={header}>{header}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Select Y Axis</label>
                <select
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Select --</option>
                  {headers.map((header, index) => (
                    <option key={index} value={header}>{header}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Chart Type</label>
                <select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                  <option value="pie">Pie</option>
                </select>
              </div>
            </div>

            <div className="text-center mb-6">
              <button
                onClick={handleGenerateChart}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
              >
                Generate Chart
              </button>
            </div>
          </>
        )}

        {chartData && (
          <div className="mt-8">
            {renderChart()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelChartWithTypes;
