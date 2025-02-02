import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CreateProject from "./pages/create_project/CreateProject";
import ProjectsPage from "./pages/projects/ProjectsPage";
import UserProfile from "./pages/profile/UserProfile";
import HomePage from "./pages/home/Home";
import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/register/Signup";
import SingleProjectPage from "./pages/single_project/SingleProjectPage";
import FundProjectPage from "./pages/fund_page/FundProject";
import MyProjects from "./pages/my_projects/MyProjects";
import BookmarksPage from "./pages/my_bookmarks/BookmarksPage";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import ResetPassword from "./pages/reset_password/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import UpdateProject from "./pages/update_project/UpdateProject";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import MyInvestmentsPage from "./pages/my_investments/MyInvestmentsPage";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/projects/all' element={<ProjectsPage />} />
        <Route path='/project/:id' element={<SingleProjectPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/projects/create' element={<CreateProject />} />
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/user/bookmarks' element={<BookmarksPage />} />
          <Route path='/fund/:id' element={<FundProjectPage />} />
          <Route path='/my/projects' element={<MyProjects />} />
          <Route path='/my/investments' element={<MyInvestmentsPage />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/project/update/:id' element={<UpdateProject />} />
        </Route>

        {/* Redirect to home if no match */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
