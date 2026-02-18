import { useEffect, useState } from "react";
import EmiApi from "../../services/EmiService";
const EMISchedule = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [schedule, setSchedule] = useState([]);

  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const fetchData = async (page, size) => {
    setLoading(true);
    try {
      const response = await EmiApi.fetchAllEmiOfCurentUser(page - 1, size);
      setSchedule(response.content);
      console.log(response.content);
      
      setTotalItems(response.totalElements);
      setTotalPages(response.totalPages);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayEmi = (emiId) => {
    console.log(`Pay EMI clicked for ID: ${emiId}`);
    // Here you can trigger API call for EMI payment
  };

  const badgeClass = (status) => {
    if (status === "PAID") return "text-green-700 bg-green-100";
    if (status === "OVERDUE") return "text-red-700 bg-red-100";
    return "text-yellow-700 bg-yellow-100"; // PENDING / default
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">EMI Schedule</h3>

        {/* Pagination controls */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="text-left py-2 w-12">#</th>
            <th className="text-left py-2">Due Date</th>
            <th className="text-left py-2">Amount</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((emi, idx) => (
            <tr
              key={emi.id}
              className={`border-b last:border-none ${
                emi.isOverdue ? "bg-red-50" : ""
              }`}
            >
              <td className="py-2">
                {(currentPage - 1) * itemsPerPage + idx + 1}
              </td>
              <td className="py-2">
                {new Date(emi.dueDate).toLocaleDateString()}
              </td>
              <td className="py-2">
                {rupee.format(Number(emi.emiAmount || 0))}
              </td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${badgeClass(
                    emi.derivedStatus
                  )}`}
                >
                  {emi.derivedStatus}
                </span>
              </td>
              <td className="py-2">
                {emi.derivedStatus !== "PAID" ? (
                  <button
                    onClick={() => handlePayEmi(emi.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Pay EMI
                  </button>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
            </tr>
          ))}

          {totalItems === 0 && (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                No EMIs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Page numbers */}
      {totalPages > 1 && (
        <div className="flex flex-wrap gap-2 justify-end mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 rounded border ${
                p === currentPage
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EMISchedule;