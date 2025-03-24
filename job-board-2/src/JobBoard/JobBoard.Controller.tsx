import { useEffect, useState } from "react";
import JobBoard from "./JobBoard";
import { Job } from "./types";

const JOBS_PER_PAGE = 6;

export function JobBoardController() {
  const [jobIds, setJobIds] = useState<string[] | null>(null);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    async function getJobIds(): Promise<string[]> {
      if (jobIds)
        return jobIds.slice(page * JOBS_PER_PAGE, (page + 1) * JOBS_PER_PAGE);

      try {
        const data = await fetch(
          "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        const ids = await data.json();
        setJobIds(ids);
        return ids.slice(0, JOBS_PER_PAGE);
      } catch (e) {
        console.log(e);
      }
      return [];
    }

    async function getJobDetails() {
      const jobsIds = await getJobIds();
      console.log("jobIds", jobIds);

      const newJobs = await Promise.all(
        jobsIds.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((data) => data.json())
            .catch((e) => console.log(e))
        )
      );

      const concatedJobs = (jobs || []).concat(newJobs);
      setJobs(concatedJobs);
    }

    getJobDetails();
  }, [page]);

  function loadMoreHandler() {
    setPage(page + 1);
  }

  return <JobBoard jobs={jobs || []} loadMoreHandler={loadMoreHandler} />;
}
