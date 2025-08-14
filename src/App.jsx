import Dashboard from "./pages/Dashboard";
import FullLayout from "./Layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import LayoutNew from "./Layout/LayoutNew";
import CompanyPage from "./pages/CompanyPage";
import LocationPage from "./pages/LocationPage";
import QuestionPage from "./pages/QuestionPage";
import ViewQuestion from "./components/Question/ViewQuestion";
import QuestionForm from "./components/Question/QuestionForm";
import FillForm from "./pages/Form/FillForm";
import FormRecords from "./pages/Form/FormRecords";
import ViewFormRecord from "./components/Form/ViewFormRecord";
import CompareScore from "./pages/CompareScore";
import NotFound404 from "./pages/NotFound404";
// import AuthWithPassWord from "./Auth/AuthWithPassWord";
import AuthWithOTP from "./Auth/AuthWithOtp";
import CategoryPage from "./pages/CategoryPage";
import AnsForm from "./pages/Form/AnsForm";
import UserPage from "./pages/UserPage";
import UserForm from "./components/Form/UserForm";
import AssignedUsers from "./pages/AssignedUsers";

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? (
      <LayoutNew>{children}</LayoutNew>
    ) : (
      <Navigate to="/" />
    );
  };

  const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/dashboard" /> : children;
  };

  return (
    <Routes>
      {/* <Route path="/" element={<FullLayout Component={<Dashboard />} />} /> */}

      <Route
        path="/"
        element={
          <PublicRoute>
           <AuthWithOTP />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/companyPage"
        element={
          <PrivateRoute>
            <CompanyPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/companyPage/:id"
        element={
          <PrivateRoute>
            <CompanyPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/locationPage"
        element={
          <PrivateRoute>
            <LocationPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/userPage"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/userForm"
        element={
          <PrivateRoute>
            <UserForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/userForm/:id"
        element={
          <PrivateRoute>
            <UserForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/categoryPage"
        element={
          <PrivateRoute>
            <CategoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/categoryPage/:id"
        element={
          <PrivateRoute>
            <CategoryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/auditPage"
        element={
          <PrivateRoute>
            <QuestionPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/questionForm/:id"
        element={
          <PrivateRoute>
            <QuestionForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/viewQuestion/:id"
        element={
          <PrivateRoute>
            <ViewQuestion />
          </PrivateRoute>
        }
      />
      <Route
        path="/questionForm"
        element={
          <PrivateRoute>
            <QuestionForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/assignedPage"
        element={
          <PrivateRoute>
            <AssignedUsers />
          </PrivateRoute>
        }
      />

      <Route
        path="/fillForm"
        element={
          <PrivateRoute>
            <FillForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/ansForm/:id/:formId"
        element={
          <PrivateRoute>
            <AnsForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/formRecords"
        element={
          <PrivateRoute>
            <FormRecords />
          </PrivateRoute>
        }
      />
      <Route
        path="/formRecords/:id"
        element={
          <PrivateRoute>
            <ViewFormRecord />
          </PrivateRoute>
        }
      />
      <Route
        path="/compareScorePage"
        element={
          <PrivateRoute>
            <CompareScore />
          </PrivateRoute>
        }
      />
         <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
