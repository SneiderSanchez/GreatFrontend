import { SerializedJob } from "./types";

export function JobBoard({
  jobs,
  handleFetchMore,
}: {
  jobs: SerializedJob[];
  handleFetchMore: () => void;
}) {
  return (
    <>
      <h2 className="text-orange-500 text-2xl">hacker News Jobs Board</h2>
      <ul>
        {jobs.map((job) => (
          <li className="flex flex-col">
            <h4>{job.title}</h4>
            <div className="flex gap-2">
              <p>By: {job.by}</p>
              <p>{job.date}</p>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleFetchMore}>Fetch more b</button>
    </>
  );
}
