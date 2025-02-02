import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { SVGProps, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { isAxiosError } from "axios";

export default function FundProjectPage() {
  const { id } = useParams();
  const [goalAmount, setGoalAmount] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState(0);

  const handlePayment = async () => {
    const url = `http://localhost:3000/api/project/esewa/${id}/invest`;
    const data = {
      investmentAmount,
    };

    try {
      const response = await api.post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        console.log(responseData);
        if (responseData.payment_method === "esewa") {
          esewaCall(responseData.formData);
        }
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Error during fetch:", error.response);
      }
    }
  };

  const esewaCall = (formData: any) => {
    console.log(formData);
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    // fetch project with id
    api
      .get(`/api/project/${id}`)
      .then((res) => {
        console.log(res);
        setGoalAmount(res.data.data.projectGoal);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [id]);

  return (
    <div className='flex flex-col min-h-dvh'>
      <section className='w-full py-12 md:py-24 lg:py-32 border-b'>
        <div className='container px-4 md:px-6 space-y-6'>
          <div className='max-w-3xl space-y-4'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Crowdfund the Next Big Idea
            </h1>
            <p className='text-muted-foreground md:text-xl'>
              Help bring this innovative project to life by contributing to the
              funding goal.
            </p>
            <div className='inline-flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
              <CoinsIcon className='h-5 w-5' />
              <span>Rs.{goalAmount} Funding Goal</span>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <Card className='mx-auto max-w-md'>
            <CardHeader>
              <CardTitle>Contribute to the Project</CardTitle>
              <CardDescription>
                Enter your information to make a contribution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className='space-y-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePayment();
                }}
              >
                <div className='space-y-2'>
                  <Label htmlFor='amount'>Contribution Amount</Label>
                  <Input
                    id='amount'
                    type='number'
                    placeholder='Rs.5000'
                    min='1'
                    required
                    onChange={(e) => setInvestmentAmount(+e.target.value)}
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Contribute
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function CoinsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx='8' cy='8' r='6' />
      <path d='M18.09 10.37A6 6 0 1 1 10.34 18' />
      <path d='M7 6h1v4' />
      <path d='m16.71 13.88.7.71-2.82 2.82' />
    </svg>
  );
}
