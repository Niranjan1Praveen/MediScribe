import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AppConfidenceChart = ({ originalConfidence, adversarialConfidence }) => {
  const data = [
    { name: "Original", Confidence: originalConfidence },
    { name: "Adversarial", Confidence: adversarialConfidence },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-center">
        Model Confidence Comparison
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[0, 1]}
            tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`}
          />
          <Tooltip formatter={(value) => `${(value * 100).toFixed(2)}%`} />
          <Legend />
          <Bar dataKey="Confidence" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppConfidenceChart;
