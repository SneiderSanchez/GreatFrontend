import { useCallback, useEffect, useState } from "react";
import { JobBoard } from "./JobBoard";
import { SerializedJob } from "./types";
import { jobBoardSerializer } from "./JobBoard.serializer";

const ITEMS_PER_PAGE = 6;

export function JobBoardController() {
  const [jobIds, setJobsIds] = useState<string[] | null>(null);
  const [jobs, setJobs] = useState<SerializedJob[] | null>(null);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    async function getJobsIds(): Promise<string[]> {
      if (jobIds)
        return jobIds.slice(ITEMS_PER_PAGE * page, ITEMS_PER_PAGE * (page + 1));
      try {
        const data = await fetch(
          "https://hacker-news.firebaseio.com/v0/jobstories.json"
        );
        const ids = await data.json();
        setJobsIds(ids);
        return ids.slice(0, ITEMS_PER_PAGE);
      } catch (e) {
        console.log(e);
        return [];
      }
    }

    async function getJobs() {
      const jobIds = await getJobsIds();

      const newJobs = await Promise.all(
        jobIds.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((data) => data.json())
            .catch((e) => console.log(e))
        )
      );
      const serializedJobs = jobBoardSerializer(newJobs);
      const concatedJobs = (jobs || []).concat(serializedJobs);

      setJobs(concatedJobs);
    }
    getJobs();
  }, [page]);

  const handleFetchMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  return <JobBoard jobs={jobs || []} handleFetchMore={handleFetchMore} />;
}
