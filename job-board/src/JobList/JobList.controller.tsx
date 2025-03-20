import { useEffect, useState } from "react";
import { JobList } from "./JobList";
import { Job } from "./types";

const FETCH_MORE_NUMBER = 6;

export function JobListController() {
  const [page, setPage] = useState(1);
  const [jobIds, setJobIds] = useState<null | string[]>(null);
  const [jobs, setJobs] = useState<null | Job[]>(null);

  useEffect(() => {
    async function getJobIds(): Promise<string[]> {
      if (jobIds) {
        return jobIds.slice(
          page * FETCH_MORE_NUMBER,
          (page + 1) * FETCH_MORE_NUMBER
        );
      }
      try {
        const data = await fetch(
          "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        if (data.status && 200) {
          const ids = await data.json();
          setJobIds(ids);
          return ids.slice(0, FETCH_MORE_NUMBER);
        }
      } catch (e) {
        console.log(e);
      }
      return [];
    }

    async function getJobDetails() {
      const jobIds = await getJobIds();

      const newJobs = await Promise.all(
        jobIds.map((jobId) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
            .then((res) => res.json())
            .catch((e) => {
              console.log(e);
            })
        )
      );

      console.log(newJobs);
      setJobs((jobs || []).concat(newJobs));
    }

    getJobDetails();
  }, [page]);

  function handleFetchMore() {
    setPage(page + 1);
  }

  return <JobList jobs={jobs || []} handleFetchMore={handleFetchMore} />;
}
