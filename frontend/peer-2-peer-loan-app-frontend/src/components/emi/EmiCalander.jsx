const EMICalendar = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-2">EMI Calendar - May 2025</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="font-semibold text-gray-500">{d}</div>
        ))}
        {Array(31)
          .fill()
          .map((_, i) => {
            const day = i + 1;
            const isDue = [10, 31].includes(day);
            return (
              <div
                key={day}
                className={`p-2 rounded-full ${
                  isDue ? "bg-orange-500 text-white" : ""
                }`}
              >
                {day}
              </div>
            );
          })}
      </div>
    </div>
  );
  export default EMICalendar;