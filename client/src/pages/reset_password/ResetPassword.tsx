import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, SVGProps, useState } from "react";
import { JSX } from "react/jsx-runtime";
import api from "@/api/api";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const [passwordChanged, setPasswordChanged] = useState(false);
  const navigate = useNavigate();

  function onResetPassword(e: FormEvent) {
    e.preventDefault();
    console.log(token);
    api
      .post(`/api/user/reset-password/${token}`, { newPassword })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success("Password reset successfully");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Some error occurred. Please try again");
      });
  }

  return (
    <div className='mx-auto max-w-md space-y-6 py-12'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Reset Password</h1>
        <p className='text-muted-foreground'>
          Enter your new password below to reset it.
        </p>
      </div>
      <form onSubmit={onResetPassword} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='password'>New Password</Label>
          <div className='relative'>
            <Input
              onChange={(e) => setNewPassword(e.target.value)}
              id='password'
              type={showPassword ? "text" : "password"}
              placeholder='Enter new password'
              required
            />
            <Button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              variant='ghost'
              size='icon'
              className='absolute inset-y-0 right-0 rounded-none'
            >
              <EyeIcon className='h-5 w-5' />
            </Button>
          </div>
        </div>
        <Button type='submit' className='w-full'>
          Reset Password
        </Button>
      </form>
    </div>
  );
}

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
