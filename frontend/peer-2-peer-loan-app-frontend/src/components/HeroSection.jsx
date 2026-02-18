import React from "react";

const HeroSection = () => {
  return (
    <div>
      <section className="  text-center py-28 px-4 bg-gradient-to-b from-indigo-400 via-purple-500 to-purple-600 ">
        <h2 className="text-5xl text-gray-50 font-bold mb-4">
          Help Students Succeed
        </h2>
        <p className="text-lg text-gray-50 mb-6 max-w-xl mx-auto">
          Connect students who need financial support with lenders who want to
          make a difference
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white border border-white/20 transform hover:-translate-y-2 duration-300">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Exam Fees</h3>
            <p>Last minute exam registration fees</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white border border-white/20 transform hover:-translate-y-2 duration-300">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-2">Course Materials</h3>
            <p>Laptops, books, and software</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white border border-white/20 transform hover:-translate-y-2 duration-300">
            <div className="text-4xl mb-4">🚨</div>
            <h3 className="text-xl font-bold mb-2">Emergency Expenses</h3>
            <p>Unexpected costs beyond monthly budget</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
