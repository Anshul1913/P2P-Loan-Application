 const EmiProgressChart = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-2">Progress</h3>
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray="251"
              strokeDashoffset="115"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-bold">
            54%
          </span>
        </div>
        <div className="flex gap-4 mt-2 text-sm">
          <span className="flex items-center gap-1 text-green-500">
            ● Paid
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            ● Remaining
          </span>
        </div>
      </div>
    </div>
  );
  export default EmiProgressChart;