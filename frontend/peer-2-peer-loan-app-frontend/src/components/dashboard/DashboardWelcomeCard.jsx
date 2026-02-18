import { useEffect, useState } from "react";
import welcomeImage from "../../assets/Screenshot 2025-08-02 125307.png"; // ⬅️ replace with your actual image path
// import welcomeSvg from '../assets/welcome-illustration.svg'
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import UserDetailApi from "../../services/UserDetailService";

const DashboardWelcomeCard = () => {
  const [name, setName] = useState(null);
  useEffect(() => {
    // Simulate fetching user name from an API or context
    const fetchUserName = async () => {
      // Simulated API call
      const response = await UserDetailApi.getUserDetails();
      console.log(response);
      setName(response);
    };
    fetchUserName();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-500 p-6 rounded-2xl shadow-2xl">
      
      <div className="flex items-center gap-4 text-white">
        <h2 className="text-3xl font-semibold">
          Hello,&nbsp;
          <span className="">{name}</span>! 👋
        </h2>
        <img
          src={welcomeImage}
          alt="Welcome Illustration"
          className="w-32 h-32 animate-float-slow"
        />
      </div>

      {/* Decorative Bubbles */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-7 right-40 w-20 h-20 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-0 left-1/2 w-20 h-20 bg-white/20 rounded-full"></div>
    </div>
  )
}
export default DashboardWelcomeCard;
