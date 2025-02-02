import api from "../../api/api";
import NavigationComponent from "../../components/custom/Navigation";
import useAuth from "../../hooks/useAuth";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

function CreateProject() {
  const auth = useAuth();

  const [category, setCategory] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectImage, setProjectImage] = useState<File | string>("");
  const [previewImage, setPreviewImage] = useState("");

  // create a handle image change function compatible with typescript
  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      setProjectImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (value: string) => {
    console.log("The category value is " + value);
    setCategory(value);
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(event.target.value);
  };
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setProjectDescription(event.target.value);
  };
  const handleGoalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProjectGoal(event.target.value);
  };
  const handleDeadlineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProjectDeadline(event.target.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({
      category,
      projectTitle,
      projectDescription,
      projectGoal,
      projectDeadline,
      projectImage,
    });

    // create a new FormData object
    const formData = new FormData();
    // append the form data
    formData.append("projectCategory", category);
    formData.append("projectTitle", projectTitle);
    formData.append("projectDescription", projectDescription);
    formData.append("projectGoal", projectGoal);
    formData.append("projectDeadline", projectDeadline!.toString());
    formData.append("projectImage", projectImage);

    api
      .post("/api/project/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Project created successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='h-screen'>
      <NavigationComponent />
      <Card className='w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-10'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            Create a New Project
          </CardTitle>
          <CardDescription>
            Fill out the form below to start your crowdfunding campaign.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className='grid grid-cols-1 md:grid-cols-2 gap-6'
          >
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='category'>Project Category</Label>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='Technology'>Technology</SelectItem>
                      <SelectItem value='Arts'>Arts</SelectItem>
                      <SelectItem value='Music'>Music</SelectItem>
                      <SelectItem value='Games'>Games</SelectItem>
                      <SelectItem value='Food'>Food</SelectItem>
                      <SelectItem value='Fashion'>Fashion</SelectItem>
                      <SelectItem value='Others'>others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='title'>Project Title</Label>
                <Input
                  onChange={handleTitleChange}
                  id='title'
                  placeholder='Enter a title for your project'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='description'>Project Description</Label>
                <Textarea
                  onChange={handleDescriptionChange}
                  id='description'
                  rows={4}
                  placeholder='Describe your project'
                />
              </div>
            </div>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='goal'>Funding Goal</Label>
                  <Input
                    onChange={handleGoalChange}
                    id='goal'
                    type='number'
                    placeholder='Rs.1,000'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='deadline'>Deadline</Label>
                  <Input
                    onChange={handleDeadlineChange}
                    id='deadline'
                    type='date'
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='image'>Project Image</Label>
                <div className='flex items-center gap-4'>
                  <Input onChange={handleImageChange} id='image' type='file' />
                  <div className='w-24 h-24 overflow-hidden rounded-md'>
                    <img
                      src={previewImage}
                      width='96'
                      height='96'
                      alt='Project Image'
                      className='object-cover'
                      style={{ aspectRatio: "96/96", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button type='submit'>Create Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateProject;
