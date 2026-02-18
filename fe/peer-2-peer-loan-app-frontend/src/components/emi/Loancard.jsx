import ProgressRing from "./ProgressRing";

const LoanCard = ({ loan = {}, progress = 0.7, remaining = 0 }) => {
  const pct = Math.round(progress * 100);

  return (
    <div className="bg-white rounded-lg p-6 shadow panel">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">Student Loan</h2>
          <div className="grid grid-cols-2 gap-y-3 mt-4 text-sm text-slate-600">
            <div>Principal</div><div className="font-medium">₹ {loan?.principal ?? '—'}</div>
            <div>Rate</div><div className="font-medium">{loan?.rate ?? '—'}%</div>
            <div>Tenure</div><div className="font-medium">{loan?.tenureMonths ?? '—'} mo</div>
            <div>Next EMI</div><div className="text-indigo-600 font-medium"> {">"} </div>
          </div>
        </div>

        <div className="w-48 flex flex-col items-center">
          <ProgressRing size={120} stroke={10} progress={progress} />
          <div className="mt-3 text-center">
            <div className="text-sm text-slate-500">Remaining</div>
            <div className="text-lg font-semibold">₹ {remaining.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoanCard;