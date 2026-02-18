export default function RecentActivityTable({ activities }) {
    const hasActivities = Array.isArray(activities) && activities.length > 0;
 
  return (
     <div className="bg-white rounded-lg p-4 shadow">
      <div className="text-lg font-semibold mb-4">Recent Activities</div>

      {hasActivities ? (
        <>
          {/* Table Header */}
          <div className="text-sm text-gray-500 grid grid-cols-4 gap-2 font-medium border-b pb-1">
            <span>Date</span>
            <span>Event</span>
            <span>Impact</span>
            <span>New Score</span>
          </div>

          {/* Table Rows */}
          {activities.map((act, index) => {
            const impactColor = act.impact.startsWith("+") ? "text-green-600" : "text-red-600";
            const formattedDate = new Date(act.date).toLocaleDateString();

            return (
              <div key={index} className="grid grid-cols-4 gap-2 py-2 border-b text-sm">
                <span>{formattedDate}</span>
                <span>{act.event}</span>
                <span className={impactColor}>{act.impact}</span>
                <span>{act.score}</span>
              </div>
            );
          })}
        </>
      ) : (
        <div className="text-gray-400 text-sm text-center py-6">
          No recent activities available.
        </div>
      )}
    </div>
  );
}
