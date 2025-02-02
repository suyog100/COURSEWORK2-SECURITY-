import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SignupPage from "./Signup";
import { toast } from "react-hot-toast";
import { registerUserApi } from "../../api/api";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { AxiosResponse } from "axios";

// Mock the API and react-router-dom
jest.mock("../../api/api");
jest.mock("react-hot-toast");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("AuthSignup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should display error toast message on register fail! with email already in use", async () => {
    const mockRegisterUserApi = registerUserApi as jest.MockedFunction<
      typeof registerUserApi
    >;
    mockRegisterUserApi.mockResolvedValue({
      data: {
        success: false,
        error: "User Already Exist!",
      },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {} as any,
    } as AxiosResponse);

    render(
      <Router>
        <SignupPage />
      </Router>,
    );

    // Finding elements
    const usernameInput = screen.getByLabelText("Username");
    const phoneInput = screen.getByLabelText("Phone");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const form = screen.getByRole("form");

    // Simulating user input
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "Elon" } });
      fireEvent.change(phoneInput, { target: { value: "1234567890" } });
      fireEvent.change(emailInput, { target: { value: "elon@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "password123" },
      });
      fireEvent.submit(form);
    });

    // Ensuring that the API call was made with the correct data and the toast was displayed
    await waitFor(
      () => {
        expect(mockRegisterUserApi).toHaveBeenCalledWith({
          username: "Elon",
          phone: "1234567890",
          email: "elon@gmail.com",
          password: "password123",
        });
        expect(toast.error).toHaveBeenCalledWith("User Already Exist!");
      },
      { timeout: 3000 },
    );
  });

  it("Should handle successful registration", async () => {
    const mockRegisterUserApi = registerUserApi as jest.MockedFunction<
      typeof registerUserApi
    >;
    mockRegisterUserApi.mockResolvedValue({
      data: {
        success: true,
        message: "User registered successfully!",
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as any,
    } as AxiosResponse);

    render(
      <Router>
        <SignupPage />
      </Router>,
    );

    // Finding elements
    const usernameInput = screen.getByLabelText("Username");
    const phoneInput = screen.getByLabelText("Phone");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const form = screen.getByRole("form");

    // Simulating user input
    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "NewUser" } });
      fireEvent.change(phoneInput, { target: { value: "9876543210" } });
      fireEvent.change(emailInput, {
        target: { value: "newuser@example.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "securepass123" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "securepass123" },
      });
      fireEvent.submit(form);
    });

    // Ensuring that the API call was made with the correct data and success toast was displayed
    await waitFor(
      () => {
        expect(mockRegisterUserApi).toHaveBeenCalledWith({
          username: "NewUser",
          phone: "9876543210",
          email: "newuser@example.com",
          password: "securepass123",
        });
        expect(toast.success).toHaveBeenCalledWith(
          "User registered successfully!",
        );
      },
      { timeout: 3000 },
    );
  });
});
