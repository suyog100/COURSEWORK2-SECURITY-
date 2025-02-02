import React, { useEffect, useState } from "react";
import { Project } from "../projects/ProjectsPage";
import NavigationComponent from "@/components/custom/Navigation";
import api from "@/api/api";
import ProjectCard from "@/components/custom/ProjectCard";

function MyProjects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    api
      .get(`/api/project/my/projects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const retrievedProjects = res.data.data;
        console.log(retrievedProjects);
        setAllProjects(retrievedProjects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavigationComponent />
      <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 py-6'>
        {allProjects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            projectTitle={project.projectTitle}
            projectDescription={project.projectDescription}
            projectGoal={project.projectGoal}
            imageUrl={project.projectImage}
            projectAmountRaised={project.investedAmount}
            showActions={true} // Pass showActions as true here
          />
        ))}
      </div>
    </>
  );
}

export default MyProjects;
