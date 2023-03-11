import { Octokit } from "@octokit/rest";
import { useEffect, useState } from "react";


const octokit = new Octokit();

export const GithubProjects = () => {
      const [projects, setProjects] = useState([]);

  useEffect(() => {
    octokit.repos
      .listForAuthenticatedUser({
        sort: "updated",
        direction: "desc",
        per_page: 3,
      })
      .then(({ data }) => setProjects(data));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded-xl">
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-gray-500">{project.description}</p>
            <div className="flex items-center mt-4">
              <img
                src={project.owner.avatar_url}
                alt="Avatar"
                className="w-6 h-6 rounded-full overflow-hidden"
              />
              <span className="ml-2 font-medium text-sm text-gray-500">
                {project.owner.login}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubProjects;