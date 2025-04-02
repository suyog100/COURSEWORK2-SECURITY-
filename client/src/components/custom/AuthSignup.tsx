import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SVGProps, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { QuoteComponent } from "./Quote";

function AuthSignup() {
  const getPasswordStrength = () => {
    let score = 0;
    if (isPasswordLengthValid) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecialChar) score++;
  
    return (score / 5) * 100; // Convert to percentage
  };
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
 

  // Real-time validation states for password strength
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  function validatePasswordStrength(password: string) {
    setIsPasswordLoading(true);




    // Password strength checks
    const minLength = 8;
    const passwordLengthValid = password.length >= minLength;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Update validation states
    setIsPasswordLengthValid(passwordLengthValid);
    setHasUppercase(hasUpper);
    setHasLowercase(hasLower);
    setHasNumber(hasDigit);
    setHasSpecialChar(hasSpecial);

    // Simulate delay for rolling effect
    setTimeout(() => setIsPasswordLoading(false), 500); // simulate loading time
  }


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    validatePasswordStrength(password);  // Trigger validation
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const confirmValue = e.target.value;
    setConfirmPassword(confirmValue);
    setPasswordsMatch(confirmValue === password);
  };

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !isPasswordLengthValid ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !passwordsMatch
    ) {
      toast.error("Please complete all password requirements.");
      return;
    }

    const payload = {
      username,
      email,
      password,
      phone,
    };

    api
      .post("/api/user/register", payload)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.error);
        }
      })
      .catch((err) => {
        toast.error("An error occurred during registration.");
      });
  }

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-6 xl:p-10">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">
              Enter your information to create an account.
            </p>
          </div>
          <form role="form" id="signup-form" onSubmit={handleSignup}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  placeholder="JohnDoe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  type="text"
                  placeholder="9841362344"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="suyog@example.com"
                  required
                />
              </div>
              
             
            <div className="relative space-y-2">
  <div className="flex items-center justify-between">
    <Label htmlFor="password">Password</Label>
  </div>
  <Input
    onChange={handlePasswordChange}
    id="password"
    type={showPassword ? "text" : "password"}
    required
    placeholder="password"
  />
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className="absolute bottom-5 right-1 h-7 w-7"
    onClick={() => setShowPassword(!showPassword)}
  >
    <EyeIcon className="h-4 w-4" />
    <span className="sr-only">Toggle password visibility</span>
  </Button>

  {/* Password Strength Bar */}
  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
    <div
      className={`h-full rounded-full transition-all duration-300 ${
        getPasswordStrength() < 40
          ? "bg-red-500"
          : getPasswordStrength() < 80
          ? "bg-yellow-500"
          : "bg-green-500"
      }`}
      style={{ width: `${getPasswordStrength()}%` }}
    ></div>
  </div>
</div>

              {/* requiremnts */}
              <div className="text-xs ">
              
              {/* <div>
                {isPasswordLoading ? (
                  <span className="animate-spin text-blue-500">⟳</span>
                ) : hasSpecialChar ? (
                  <span className="text-green-500">✔</span>
                ) : (
                  <span className="text-red-500">✘</span>
                )}
                At least 1 Special Character
              </div> */}
              {/* confirm password */}
              <div className="relative space-y-2 pt-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <Input
                  onChange={handleConfirmPasswordChange}
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1 right-1 h-7 w-7"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <EyeIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              <div>
               
                {passwordsMatch ? (
                  <span className="text-green-500 text-xs">✔ Passwords match</span>
                ) : (
                  <span className="text-red-500 text-xs">✘ Passwords do not match</span>
                )}
              </div>
              <div >
                {isPasswordLoading ? (
                  <span className="animate-spin text-blue-500 ">⟳</span>
                ) : isPasswordLengthValid ? (
                  <span className="text-green-500">✔</span>
                ) : (
                  <span className="text-red-500">✘</span>
                )}
                Min 8 characters
               
              </div>
              
              <div>
                {isPasswordLoading ? (
                  <span className="animate-spin text-blue-500 text-xs">⟳</span>
                ) : hasUppercase ? (
                  <span className="text-green-500">✔</span>
                ) : (
                  <span className="text-red-500">✘</span>
                )}
                At least 1 Uppercase
              </div>
              <div>
                {isPasswordLoading ? (
                  <span className="animate-spin text-blue-500">⟳</span>
                ) : hasLowercase ? (
                  <span className="text-green-500">✔</span>
                ) : (
                  <span className="text-red-500">✘</span>
                )}
                At least 1 Lowercase
              </div>
              <div>
                {isPasswordLoading ? (
                  <span className="animate-spin text-blue-500">⟳</span>
                ) : hasNumber ? (
                  <span className="text-green-500">✔</span>
                ) : (
                  <span className="text-red-500">✘</span>
                )}
                At least 1 Number
              </div>
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block">
        <QuoteComponent />
      </div>
    </div>
  );
}

// Eye Icon component
function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="h-4 w-4"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12c0 1.293-.576 2.448-1.5 3.214M12 12c-1.393 0-2.5-.79-2.5-1.75S10.607 8.5 12 8.5s2.5.79 2.5 1.75M18.184 15.284a9.978 9.978 0 001.305-1.841A10.016 10.016 0 0012 5c-3.733 0-6.97 2.21-8.59 5.286m3.69 6.034a9.978 9.978 0 01-1.305-1.841"
      />
    </svg>
  );
}

export default AuthSignup;
