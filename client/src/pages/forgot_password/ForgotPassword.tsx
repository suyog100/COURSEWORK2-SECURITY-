import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import api from "../../api/api";
import { FormEvent, useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errorInMail, setErrorInMail] = useState(false);

  function onResetPassword(e: FormEvent) {
    e.preventDefault();
    api
      .post("/api/user/forgot-password", { email })
      .then((res) => {
        if (res.status === 200) {
          setEmailSent(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setEmailSent(false);
        setErrorInMail(true);
      });
  }

  return (
    <div className='mx-auto max-w-md space-y-6 py-12'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Forgot Password</h1>
        <p className='text-muted-foreground'>
          Enter your email below and we'll send you a link to reset your
          password.
        </p>
      </div>
      <form onSubmit={onResetPassword} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            type='email'
            placeholder='m@example.com'
            required
          />
        </div>
        <Button type='submit' className='w-full'>
          Reset Password
        </Button>
      </form>
      {emailSent ? (
        <div className='rounded-md bg-green-50 p-4 text-center text-sm text-green-800'>
          <p>Reset link has been sent to your email</p>
        </div>
      ) : (
        errorInMail && (
          <div className='rounded-md bg-red-50 p-4 text-center text-sm text-red-800'>
            <p>Some error occured. Please try again!</p>
          </div>
        )
      )}
    </div>
  );
}

export default ForgotPassword;
