import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Card } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Investor } from "../../pages/single_project/SingleProjectPage";

type SingleProject = {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  projectGoal: number;
  projectDeadline: string;
  projectImage: string;
  createdBy: {
    username: string;
    _id: string;
  };
  investors: Investor[];
};

type UserType = {
  _id: string;
  username: string;
  profileImage: string;
};

type ReviewType = {
  content: string;
  user: UserType;
  createdAt: string;
  _id: string;
  project: string;
};

export default function SingleProject({
  _id,
  projectTitle,
  projectDescription,
  projectGoal,
  projectDeadline,
  projectImage,
  createdBy,
  investors,
}: SingleProject) {
  const [reviewContent, setReviewContent] = useState("");

  const [reviews, setReviews] = useState<ReviewType[]>([]);

  console.log("THE RECEIVED PROP ID IS ", _id);

  useEffect(() => {
    api
      .get(`/api/project/reviews/${_id}`)
      .then((res) => {
        console.log("INSIDE THE SECOND LAYER ", res.data.data.reviews);
        setReviews(res.data.data || []);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [_id]);

  function onReviewAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    api
      .post(
        `/api/project/review/${_id}`,
        {
          reviewContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        const newReview = {
          content: res.data.data.content,
          user: res.data.data.user,
          createdAt: res.data.data.createdAt,
          _id: res.data.data._id,
          project: res.data.data.project,
        };

        setReviews((prevReviews) => [...prevReviews, newReview]);
        setReviewContent("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='flex flex-col'>
      <section className='bg-muted py-12 md:py-20 lg:py-24'>
        <div className='container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center'>
          <div>
            <img
              src={"http://localhost:3000/" + projectImage}
              alt='Product Image'
              width={400}
              height={400}
              className='w-full rounded-lg'
            />
          </div>
          <div className='space-y-4'>
            <h1 className='text-3xl md:text-4xl font-bold'>{projectTitle}</h1>
            <p className='text-muted-foreground text-lg'>
              {projectDescription}
            </p>
            <p className='text-muted-foreground text-lg'>
              Deadline: {projectDeadline.slice(0, 10)}
            </p>
            <p className='text-muted-foreground font-bold text-lg'>
              Creator: {createdBy.username}
            </p>

            <Button size='lg' asChild>
              <Link to={`/fund/${_id}`}>Fund Project</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className='py-12 md:py-20 lg:py-24'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='grid md:grid-cols-2 gap-8 '>
            <div className='text-center'>
              <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                Project Details
              </h2>
              <ul className='space-y-2 text-muted-foreground'>
                <li>Innovate The Fashion Industry</li>
                <li>Benefits for early investors</li>
                <li>10% of profits donated to charity</li>
                <li>Exclusive access to new products</li>
              </ul>
            </div>
            <div className='mt-8 md:mt-12 text-center'>
              <h2 className='text-2xl md:text-3xl font-bold mb-4'>Goal</h2>
              <p className='text-4xl font-bold text-primary'>
                Rs. {projectGoal.toLocaleString()}
              </p>
              <Button size='lg' className='mt-4' asChild>
                <Link to={`/fund/${_id}`}>Fund Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* INVESTORS SECTION GOES HERE */}
      <section className=' py-12 md:py-16 lg:py-20 bg-muted'>
        <div className='container'>
          <div className='mb-8 md:mb-10 lg:mb-12'>
            <h2 className='text-2xl text-center font-bold md:text-3xl lg:text-4xl'>
              Our Investors
            </h2>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            <div className='rounded-lg bg-card p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md'>
              {investors.length === 0 ? (
                <h1>No investors so far</h1>
              ) : (
                investors.map((investor) => {
                  return (
                    <div className='flex items-center space-x-4'>
                      <Avatar>
                        <AvatarImage
                          src={
                            "http://localhost:3000" +
                            investor.investorId.profileImage
                          }
                          alt='Investor 1'
                        />
                        <AvatarFallback>
                          {investor.investorId.username
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className='text-lg font-medium'>
                          {investor.investorId.username}
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                          Rs.{investor.investedAmount}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
      <section className='py-12 md:py-20 lg:py-24 bg-background'>
        <div className='container mx-auto px-4 md:px-6'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6'>
            Related Projects
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className='bg-background rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl'
              >
                <Link to='#'>
                  <img
                    src='/placeholder.svg'
                    alt={`Related Product ${item}`}
                    width={300}
                    height={300}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-4'>
                    <h3 className='text-lg font-bold'>
                      Related Product {item}
                    </h3>
                    <p className='text-muted-foreground'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className='mt-2 flex justify-between items-center'>
                      <p className='text-primary font-bold'>$49.99</p>
                      <Button size='sm'>Add to Cart</Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='py-12 md:py-20 lg:py-24 bg-muted'>
        <div className='container mx-auto px-4 md:px-6'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6'>Reviews</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='overflow-scroll h-96'>
              {reviews.length === 0 ? (
                <Card className='w-full p-4 flex items-start gap-4'>
                  NO reviews added
                </Card>
              ) : (
                reviews.map((review) => {
                  return (
                    <Card className='w-full p-4 flex items-start gap-4'>
                      <Avatar className='shrink-0'>
                        <AvatarImage
                          src={
                            "http://localhost:3000" + review.user.profileImage
                          }
                        />
                        <AvatarFallback>
                          {review.user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className='bg-muted rounded-md p-4 flex-1'>
                        <p className='text-sm text-muted-foreground'>
                          {review.content}
                        </p>
                        <div className='flex items-center gap-2 mt-2 text-xs text-muted-foreground'>
                          <span>{review.user.username}</span>
                          <span>•</span>
                          <span>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>

            <div>
              <form
                className='bg-background rounded-lg p-6 shadow-lg'
                onSubmit={onReviewAdd}
              >
                <h3 className='text-xl font-bold mb-4'>Write a Review</h3>
                <div className='grid gap-4'>
                  <div>
                    <Label htmlFor='review' className='text-base'>
                      Review
                    </Label>
                    <Textarea
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      id='review'
                      placeholder='Write your review'
                      className='min-h-[120px]'
                    />
                  </div>
                  <Button type='submit' size='lg'>
                    Submit Review
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
