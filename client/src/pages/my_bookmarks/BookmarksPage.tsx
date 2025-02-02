import NavigationComponent from "../../components/custom/Navigation";
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ProjectCard from "../../components/custom/ProjectCard";

type Bookmark = {
  projectId: {
    _id: string;
    projectTitle: string;
    projectDescription: string;
    projectGoal: number;
    projectDeadline: string;
    projectImage: string;
    projectCategory: string;
    investedAmount: number;
  };
};

function BookmarksPage() {
  const [allProjects, setAllProjects] = useState<Bookmark[]>([]);

  useEffect(() => {
    api
      .get(`/api/project/my/bookmarks`, {
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
      <h1 className='text-center text-2xl py-4'>My Bookmarks</h1>
      <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6 py-6'>
        {allProjects.length == 0 ? (
          <h1>No Bookmarks</h1>
        ) : (
          allProjects.map((project) => (
            <ProjectCard
              key={project.projectId._id}
              id={project.projectId._id}
              projectTitle={project.projectId.projectTitle}
              projectDescription={project.projectId.projectDescription}
              projectGoal={project.projectId.projectGoal}
              imageUrl={project.projectId.projectImage}
              projectAmountRaised={project.projectId.investedAmount}
            />
          ))
        )}
      </div>
    </>
  );
}

export default BookmarksPage;
