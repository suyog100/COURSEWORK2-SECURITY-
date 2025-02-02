import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useAuth from "../../hooks/useAuth";
import { SVGProps, useState } from "react";
import toast from "react-hot-toast";
import { JSX } from "react/jsx-runtime";
import { QuoteComponent } from "./Quote";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { loginUserApi } from "@/api/api";
import { isAxiosError } from "axios";

function AuthLogin() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ email, password });

    const payload = {
      email,
      password,
    };

    const res = await auth.login(payload);
    console.log("In login", res);

    if (res.success) {
      toast.success(res.message);
      navigate("/");
    } else {
      toast.error(res.message);
    }

  }

  return (
    <div className='w-full min-h-screen grid lg:grid-cols-2 bg-background'>
      <div className='flex items-center justify-center p-6 xl:p-10'>
        <div className='mx-auto w-[350px] space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Welcome back</h1>
            <p className='text-muted-foreground'>
              Enter your credentials to access your account.
            </p>
            <p className='text-muted-foreground'>
              Don't have an account?{" "}
              <Link to='/signup' className='underline'>
                Sign up
              </Link>
            </p>
          </div>
          <form data-testid='login-form' role='login' onSubmit={handleLogin}>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='suyog@example.com'
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='relative space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
              
                </div>
                <Input
                  placeholder='**********'
                  id='password'
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute bottom-8 right-1 h-7 w-7'
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <EyeIcon className='h-4 w-4' />
                  <span className='sr-only'>Toggle password visibility</span>
                </Button>
                <Link
                    to='/forgot-password'
                    className='text-sm text-primary underline'
                  >
                    Forgot password?
                  </Link>
              </div>
              <Button className='w-full' type='submit'>
                Sign In
              </Button>
            </div>
          </form>
          <p className='text-center'>
            Don't have an account?{" "}
            <Link to='/signup' className='font-bold hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <QuoteComponent />
    </div>
  );
}

export default AuthLogin;

function EyeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  );
}
