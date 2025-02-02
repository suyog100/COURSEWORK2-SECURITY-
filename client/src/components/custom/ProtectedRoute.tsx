import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { jwtDecode, JwtPayload } from "jwt-decode";

const ProtectedRoute = () => {
  const auth = useAuth();

  if (auth.user) {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const expiryTime = decodedToken.exp! * 1000;

      if (Date.now() >= expiryTime) {
        auth.logout();
        return <Navigate to='/login' />;
      }

      return <Outlet />;
    }
  }
};

export default ProtectedRoute;
