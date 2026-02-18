import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import StudentKYCVerification from '../pages/KycPage/StudentKYCVerification';
import NotFound404 from '../pages/404NotFound/NotFound404';
import ROLES from '../utils/constant/Role';
import ProtectedRoute from '../config/ProtectedRoutes';
import StudentDashboard from '../pages/dashboard/StudentDashboard';
import WalletPage from '../pages/wallet/Wallet';
import CreditScorePage from '../pages/creditPage/CreditScorePage';
import KycRequestPage from '../pages/admin/KycRequestPage';
import ViewKycDetails from '../pages/admin/ViewKycDetails';
import RequestLoanPage from '../pages/loan/RequestLoanPage';
import LoanRequestWizardOne from '../pages/loan/RequestLoanOne';
import LoanRequestWizard from '../pages/loan/RequestLoanPageOne';
import LenderDashboard from '../pages/dashboard/LenderDashboard';
import ViewLoanRequestsPage from '../pages/lenders/ViewLoanRequestsPage';
import ReviewLoanRequest from '../pages/lenders/ViewLoanApplication';
import EMIPage2 from '../components/emi/EmiPage2';
import LoanDashboard from '../pages/dashboard/LoanDashboard';
// import RequestLoanPageOne from '../pages/loan/RequestLoanPageOne';
const RoutesComponent = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/kyc-verification" element={<StudentKYCVerification />} /> */}
        <Route path="/kyc-verification" element={<ProtectedRoute element={StudentKYCVerification} allowedRoles={[ROLES.BORROWER,ROLES.LENDERS]} />}/>
        <Route path="/student-dashboard" element={<ProtectedRoute element={StudentDashboard} allowedRoles={[ROLES.BORROWER]} />}/>
        
        <Route path="/lender-dashboard" element={<ProtectedRoute element={LenderDashboard} allowedRoles={[ROLES.LENDERS]} />}/>
        <Route path="/unauthorized" element={<NotFound404 />} />
        <Route path="/wallet" element={<ProtectedRoute element={WalletPage} allowedRoles={[ROLES.BORROWER,ROLES.LENDERS]} />} />
        <Route path="/credit-score" element={<ProtectedRoute element={CreditScorePage} allowedRoles={[ROLES.BORROWER]} />} />
        <Route path="/*" element={<NotFound404 />} />
        <Route path="/kyc-verification-admin" element={<KycRequestPage />} />
        <Route path="/kyc-requests/:id" element={<ViewKycDetails />} />
        <Route path="/loan-request" element={<RequestLoanPage />} />
        <Route path="/loan-request-two" element={<LoanRequestWizardOne />} />
        <Route path="/view-loan-request" element={<ViewLoanRequestsPage />} />
        <Route path="/view-loan-application/:id" element={<ReviewLoanRequest />} />
        <Route path="/emi" element={<EMIPage2 />} />
        <Route path="/loan-dashboard" element={<LoanDashboard />} />

      </Routes>
    </Router>
  );
};
export default RoutesComponent;
