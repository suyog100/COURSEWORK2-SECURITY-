import api from "../api/api";
import { isAxiosError } from "axios";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

type UserType = {
  email: string;
  username: string;
  id: string;
};

type IncomingUserData = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: UserType | null;
  token: string;
  login: (
    userData: IncomingUserData,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const login = async (userData: IncomingUserData) => {
    try {
      const response = await api.post("/api/user/login", userData);
      const data = response.data;
      console.log(data);

      if (data.success === true) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return {
          success: true,
          message: data.message,
        };
      } else {
        console.log("Inside else block");
        return {
          success: false,
          message: data.message,
        };
      }
    } catch (e) {
      console.log("Inside catch block");
      // console.log(e);
      if (isAxiosError(e) && e.response?.data) {
        console.log(e.response);
        return { success: false, message: e.response.data.message };
      } else {
        return { success: false, message: "An error occurred" };
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
