import axios from "axios";
import { getAllProjects } from "@/api/api"; // Adjust the import based on your project structure
import { projectMock } from "@/__mocks__/projectMock"; // Adjust the import based on your project structure

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getAllProjects API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all projects and match with mock data", async () => {
    // Mock the GET request to return the mock data
    mockedAxios.get.mockResolvedValueOnce({ data: projectMock });

    // Call the API
    const result = await getAllProjects({
      page: 1,
      limit: "8",
      search: "",
      categories: [],
      funding: [],
    });

    // Verify the axios GET request was called correctly
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "/api/project/all?page=1&limit=8&search=&categories=&funding=",
    );

    // Verify the returned data matches the mock data
    expect(result).toEqual(projectMock);

    // Optionally, you can check if the data contains specific projects
    expect(result.data).toHaveLength(11);
    expect(result.data[0].projectTitle).toBe("h");
    expect(result.data[1].projectTitle).toBe("test");
  });
});
