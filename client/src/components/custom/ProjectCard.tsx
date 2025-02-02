import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type ProjectCardProps = {
  id: string;
  projectTitle: string;
  projectDescription: string;
  projectGoal: number;
  imageUrl: string;
  projectAmountRaised: number;
  showActions?: boolean; // Add this prop to show update and delete buttons
};

import { Card, CardContent } from "../ui/card";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SVGProps } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function ProjectCard({
  id,
  projectTitle,
  projectDescription,
  projectGoal,
  imageUrl,
  projectAmountRaised,
  showActions = false, // Default to false if not provided
}: ProjectCardProps) {
  const navigate = useNavigate();

  function createBookmark() {
    api
      .post(
        `/api/project/bookmark/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
        toast.success("Project bookmarked successfully");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to bookmark project");
      });
  }

  function deleteProject() {
    api
      .delete(`/api/project/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Project deleted successfully");
        navigate(0); // Reload the page to reflect changes
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to delete project");
      });
  }

  console.log(projectTitle, projectDescription);

  return (
    <Card className='group flex flex-col justify-between '>
      <div className='overflow-hidden rounded-t-lg'>
        <img
          src={"http://localhost:3000" + imageUrl}
          alt='Project image'
          width={400}
          height={300}
          className='h-full w-full object-cover transition-all group-hover:scale-105'
          style={{ aspectRatio: "400/300", objectFit: "cover" }}
        />
      </div>
      <CardContent className='p-4 flex flex-col justify-between'>
        <div>
          <div className='grid gap-1'>
            <div className='flex justify-between items-center'>
              <h3 className='text-lg font-semibold'>{projectTitle}</h3>
              <Button
                onClick={createBookmark}
                variant='ghost'
                size='icon'
                className='rounded-full'
              >
                <HeartIcon className='h-5 w-5' />
                <span className='sr-only'>Favorite</span>
              </Button>
            </div>
            <p className='text-sm text-muted-foreground line-clamp-2'>
              {projectDescription}
            </p>
          </div>
          <div className='flex items-center gap-1'>
            <div className='text-lg font-semibold'>
              Rs.{projectAmountRaised}
            </div>
            <div className='text-sm text-muted-foreground'>
              of Rs.{projectGoal} goal
            </div>
          </div>
        </div>
        <Link to={`/project/${id}`}>
          <Button className='mt-4 w-full'>Contribute</Button>
        </Link>

        {showActions && (
          <div className='flex justify-between mt-4'>
            <Link to={`/project/update/${id}`}>
              <Button
                type='button'
                variant='secondary'
                className='bg-green-300'
              >
                Update
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='sm:max-w-[425px]'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteProject}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
    </svg>
  );
}
