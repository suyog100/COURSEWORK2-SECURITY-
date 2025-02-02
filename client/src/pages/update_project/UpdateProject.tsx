import api from "@/api/api";
import NavigationComponent from "@/components/custom/Navigation";
import useAuth from "@/hooks/useAuth";
import React, { ChangeEvent, useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProject() {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectImage, setProjectImage] = useState<File | string>("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    // Fetch the existing project data
    api
      .get(`/api/project/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        const project = res.data.data.project;
        setCategory(project.projectCategory);
        setProjectTitle(project.projectTitle);
        setProjectDescription(project.projectDescription);
        setProjectGoal(project.projectGoal.toString());
        setProjectDeadline(
          new Date(project.projectDeadline).toISOString().split("T")[0],
        );
        setPreviewImage("http://localhost:3000/" + project.projectImage);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load project data");
      });
  }, [id, auth.token]);

  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      setProjectImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (value: string) => {
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

    const formData = new FormData();
    formData.append("projectCategory", category);
    formData.append("projectTitle", projectTitle);
    formData.append("projectDescription", projectDescription);
    formData.append("projectGoal", projectGoal);
    formData.append("projectDeadline", projectDeadline);

    if (projectImage) {
      formData.append("projectImage", projectImage);
    }

    api
      .put(`/api/project/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Project updated successfully");
        navigate("/my/projects");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update project");
      });
  }

  return (
    <div className='h-screen'>
      <NavigationComponent />
      <Card className='w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-10'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Update Project</CardTitle>
          <CardDescription>
            Edit the form below to update your crowdfunding campaign.
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
                <Select onValueChange={handleCategoryChange} value={category}>
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
                      <SelectItem value='Others'>Others</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='title'>Project Title</Label>
                <Input
                  onChange={handleTitleChange}
                  value={projectTitle}
                  id='title'
                  placeholder='Enter a title for your project'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='description'>Project Description</Label>
                <Textarea
                  onChange={handleDescriptionChange}
                  value={projectDescription}
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
                    value={projectGoal}
                    id='goal'
                    type='number'
                    placeholder='Rs.1,000'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='deadline'>Deadline</Label>
                  <Input
                    onChange={handleDeadlineChange}
                    value={projectDeadline}
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
              <Button type='submit'>Update Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpdateProject;
