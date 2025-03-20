import { Job } from "./types";

export function JobList({
  jobs,
  handleFetchMore,
}: {
  jobs: Job[];
  handleFetchMore: () => void;
}) {
  return (
    <div>
      <h2>Hacker News Jobs Board</h2>

      <ul className="">
        {jobs.map((job) => (
          <li className="bg-red-100">
            <h3>{job.title}</h3>
            <div className="flex ">
              <p>By: {job.by}</p>
              <p>{job.time}</p>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={handleFetchMore}
        className="bg-orange-400 p-2 rounded-md text-white"
      >
        Load More Jobs
      </button>
    </div>
  );
}
