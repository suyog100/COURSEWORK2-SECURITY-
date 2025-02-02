import NavigationComponent from "../../components/custom/Navigation";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ProjectCard from "../../components/custom/ProjectCard";

type Project = {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  projectGoal: number;
  projectDeadline: string;
  projectImage: string;
  projectCategory: string;
  investedAmount: number;
};

function MyInvestmentsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    api
      .get(`/api/project/my/investments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const retrievedProjects = res.data;
        console.log(retrievedProjects);
        setAllProjects(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavigationComponent />
      <h1 className='text-center text-2xl py-4'>My Investments</h1>
      <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 py-6'>
        {allProjects.length == 0 ? (
          <h1>No investments so far</h1>
        ) : (
          allProjects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              projectTitle={project.projectTitle}
              projectDescription={project.projectDescription}
              projectGoal={project.projectGoal}
              imageUrl={project.projectImage}
              projectAmountRaised={project.investedAmount}
            />
          ))
        )}
      </div>
    </>
  );
}

export default MyInvestmentsPage;
