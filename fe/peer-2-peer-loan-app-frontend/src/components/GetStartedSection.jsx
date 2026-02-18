import { useState } from "react";
import StudentRegisterModal from "../components/signup/StudentRegisterModal";
import LenderRegisterModal from "../components/signup/LenderRegisterModal";
const GetStartedSection = () => {
  
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showLenderModal, setShowLenderModal] = useState(false);

    return (
    <section id="get-started" className="bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 py-24 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Student Card */}
        <div
          onClick={() => setShowStudentModal(true)}
          className="cursor-pointer bg-white text-indigo-500 text-center p-8 rounded-2xl border border-white/20 shadow-xl hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-xl font-extrabold mb-2">I'm a Student</h3>
          <p className="text-indigo-500">I need funding for my education expenses</p>
        </div>

        {/* Lender Card */}
        <div
          onClick={() => setShowLenderModal(true)}
          className="cursor-pointer bg-white text-indigo-500 text-center p-8 rounded-2xl border border-white/20 shadow-xl hover:-translate-y-3.5 transition-transform duration-300"
        >
          <div className="text-5xl mb-4">💡</div>
          <h3 className="text-xl font-extrabold mb-2">I'm a Lender</h3>
          <p className="text-indigo-500">I want to help students while earning returns</p>
        </div>
      </div>

      {/* Modals */}
      {showStudentModal && <StudentRegisterModal onClose={() => setShowStudentModal(false)} />}
      {showLenderModal && <LenderRegisterModal onClose={() => setShowLenderModal(false)} />}
    </section>
  );
};

export default GetStartedSection;
