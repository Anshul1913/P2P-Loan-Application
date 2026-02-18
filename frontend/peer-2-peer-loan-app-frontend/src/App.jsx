import React, {  useRef } from 'react';
import './App.css'; // You can keep this for custom CSS if needed
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ToastProvider } from './components/utility/toast/toastContext'; // Update path as needed
import RoutesComponent from './routes/RouteComponent';

const App = () => {
  const contentRef = useRef(null);

  // useEffect(() => {
  //   // const refreshTokenInterval = async () => {
  //   //   try {
  //   //     const response = await OpenApi.refreshToken();
  //   //     if (!response) {
  //   //       Cookies.remove("jwtToken");
  //   //       Cookies.remove("refreshJwtToken");
  //   //       window.location.href = "/";
  //   //     }
  //   //   } catch (error) {
  //   //     console.error('Error refreshing token:', error);
  //   //   }
  //   // };

  //   // const intervalId = setInterval(refreshTokenInterval, 60 * 60 * 1000); // 1 hour

  //   // return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="app" ref={contentRef}>
      
      
        <RoutesComponent />
        <ToastContainer />
      {/* </ToastProvider> */}
    </div>
  );
};

export default App;
