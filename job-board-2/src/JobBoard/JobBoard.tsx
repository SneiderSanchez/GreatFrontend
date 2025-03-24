import { Job } from "./types";

export default function JobBoard({
  jobs,
  loadMoreHandler,
}: {
  jobs: Job[];
  loadMoreHandler: () => void;
}) {
  return (
    <div className="p-4">
      <h1 className="text-orange-500 text-2xl mb-3">hacker News Jobs board</h1>
      <ul className="p-4 bg-white">
        {jobs.map((job) => (
          <li>{job.title}</li>
        ))}
      </ul>
      <button onClick={() => loadMoreHandler()}>Load more bitchesss</button>
    </div>
  );
}
