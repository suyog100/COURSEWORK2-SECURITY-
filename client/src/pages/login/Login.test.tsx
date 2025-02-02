import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AuthLogin from "./Login";
import { toast } from "react-hot-toast";
import { loginUserApi } from "@/api/api";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { AxiosResponse } from "axios";

// Mock the API and react-router-dom
jest.mock("@/api/api");
jest.mock("react-hot-toast");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("AuthLogin Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should display error toast message on login fail with incorrect credentials", async () => {
    const mockLoginUserApi = loginUserApi as jest.MockedFunction<
      typeof loginUserApi
    >;
    mockLoginUserApi.mockResolvedValue({
      data: {
        success: false,
        error: "Invalid email or password!",
      },
      status: 401,
      statusText: "Unauthorized",
      headers: {},
      config: {} as any,
    } as AxiosResponse);

    render(
      <Router>
        <AuthLogin />
      </Router>,
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const form = screen.getByTestId("login-form");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid email or password!");
    });
  });

  it("Should handle successful login", async () => {
    const mockLoginUserApi = loginUserApi as jest.MockedFunction<
      typeof loginUserApi
    >;
    mockLoginUserApi.mockResolvedValue({
      data: {
        success: true,
        token: "dummy-token",
        user: {
          id: "1",
          email: "user@example.com",
          name: "User",
        },
        message: "Login successful!",
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    } as AxiosResponse);

    render(
      <Router>
        <AuthLogin />
      </Router>,
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const form = screen.getByTestId("login-form");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "correctpassword" } });
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Login successful!");
    });
  });
});
