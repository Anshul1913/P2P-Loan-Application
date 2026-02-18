import React from "react";
const features = [
  {
    icon: "⚡", // lightning bolt emoji
    title: "Quick Approval",
    description:
      "Get approved in 24–48 hours with our streamlined verification process.",
  },
  {
    icon: "🛡️", // shield emoji
    title: "Secure & Safe",
    description:
      "Bank-level security with full KYC verification and encrypted transactions.",
  },
  {
    icon: "📊", // bar chart emoji
    title: "Build Credit Score",
    description:
      "Every payment helps build your digital credit profile for future needs.",
  },
  {
    icon: "💰", // money bag emoji
    title: "Fair Interest Rates",
    description:
      "Transparent pricing with competitive rates and no hidden fees.",
  },
  {
    icon: "📟", // calculator or EMI tracking icon (closest emoji)
    title: "Easy EMI Tracking",
    description: "Simple dashboard to track payments and manage your loans.",
  },
  {
    icon: "🤝", // handshake emoji
    title: "Direct Connection",
    description:
      "No middlemen – direct funding from lenders who care about education.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-8 bg-white">
      <h3 className="text-3xl font-bold text-center mb-12">
        Why Choose Study Fund
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white text-center p-6 rounded-xl shadow-md hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
