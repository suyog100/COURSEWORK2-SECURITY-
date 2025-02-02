import api, { getAllProjects } from "@/api/api";
import ProjectCard from "@/components/custom/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import NavigationComponent from "@/components/custom/Navigation";
import debounce from "lodash/debounce";
// import { isAxiosError } from "axios";

export type Project = {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  projectGoal: number;
  projectDeadline: string;
  projectImage: string;
  projectCategory: string;
  createdBy: {
    username: string;
    _id: string;
  };
  investedAmount: number;
};

function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFunding, setSelectedFunding] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = useCallback(() => {
    const queryParams = new URLSearchParams({
      page: pageNumber.toString(),
      limit: "8",
      search: searchTerm,
      categories: selectedCategories.join(","),
      funding: selectedFunding.join("P"),
    });

    api
      .get(`/api/project/all?${queryParams}`)
      .then((res) => {
        setAllProjects(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber, searchTerm, selectedCategories, selectedFunding]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
    setPageNumber(1);
  }, 300);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
    setPageNumber(1);
  };

  const handleFundingChange = (funding: string) => {
    setSelectedFunding((prev) =>
      prev.includes(funding)
        ? prev.filter((f) => f !== funding)
        : [...prev, funding],
    );
    setPageNumber(1);
  };

  return (
    <main className='h-screen'>
      <NavigationComponent />

      <div className='flex min-h-screen w-full bg-muted/40'>
        <aside className='hidden w-64 flex-col border-r bg-background p-6 sm:flex'>
          <div className='grid gap-6'>
            <div className='grid gap-2'>
              <h3 className='text-lg font-semibold'>Categories</h3>
              <div className='grid gap-2'>
                {["Technology", "Design", "Art", "Music", "Film"].map(
                  (category) => (
                    <Label
                      key={category}
                      className='flex items-center gap-2 font-normal'
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      {category}
                    </Label>
                  ),
                )}
              </div>
            </div>
            <div className='grid gap-2'>
              <h3 className='text-lg font-semibold'>Funding</h3>
              <div className='grid gap-2'>
                {["1,000 - 5,000", "5,000 - 10,000", "More than 10,000"].map(
                  (funding) => (
                    <Label
                      key={funding}
                      className='flex items-center gap-2 font-normal'
                    >
                      <Checkbox
                        checked={selectedFunding.includes(funding)}
                        onCheckedChange={() => handleFundingChange(funding)}
                      />
                      {funding}
                    </Label>
                  ),
                )}
              </div>
            </div>
          </div>
        </aside>
        <div className='flex flex-1 flex-col'>
          <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6'>
            <div className='relative flex-1'>
              <div className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search projects...'
                className='w-full rounded-lg bg-background pl-8 sm:w-[300px]'
                onChange={handleSearchChange}
              />
            </div>
          </header>
          <main className='flex-1 p-4 sm:p-6'>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {allProjects.length === 0 ? (
                <h1>No Projects found</h1>
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
            <div className='mt-8 flex justify-center'>
              <Pagination>
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <Button
                          variant={page === pageNumber ? "default" : "outline"}
                          size='sm'
                          className='h-8'
                          onClick={() => setPageNumber(page)}
                        >
                          {page}
                        </Button>
                      </PaginationItem>
                    ),
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}

export default ProjectsPage;
