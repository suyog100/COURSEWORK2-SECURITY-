import api from "@/api/api";
import NavigationComponent from "@/components/custom/Navigation";
import SingleProject from "@/components/custom/SingleProject";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Project = {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  projectGoal: number;
  projectDeadline: string;
  projectImage: string;
  createdBy: {
    username: string;
    profileImage: string;
    _id: string;
  };
  investedAmount: number;
};

export type Investor = {
  _id: string;
  projectId: string;
  investorId: {
    _id: string;
    username: string;
    profileImage: string;
  };
  investedAmount: number;
};

function SingleProjectPage() {
  const { id } = useParams();
  const [investors, setInvestors] = useState<Investor[]>([
    {
      _id: "",
      projectId: "",
      investorId: {
        _id: "",
        username: "",
        profileImage: "",
      },
      investedAmount: 0,
    },
  ]);
  const [singleProject, setSingleProject] = useState<Project>({
    _id: "",
    projectTitle: "",
    projectDescription: "",
    projectGoal: 0,
    projectDeadline: "",
    createdBy: {
      username: "",
      _id: "",
      profileImage: "",
    },
    projectImage: "",
    investedAmount: 0,
  });

  // fetch project with id
  useEffect(() => {
    api
      .get(`/api/project/${id}`)
      .then((res) => {
        console.log("INSIDE THE MAIN SINGLE PROJECT PAGE ", res.data);
        setSingleProject(res.data.data.project);
        setInvestors(res.data.data.investors);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [id]);

  return (
    <main>
      <NavigationComponent />
      <SingleProject
        _id={singleProject._id}
        projectTitle={singleProject.projectTitle}
        projectDescription={singleProject.projectDescription}
        projectGoal={singleProject.projectGoal}
        projectDeadline={singleProject.projectDeadline}
        projectImage={singleProject.projectImage}
        createdBy={singleProject.createdBy}
        investors={investors}
      />
    </main>
  );
}

export default SingleProjectPage;
