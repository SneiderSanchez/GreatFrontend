import { Job, SerializedJob } from "./types";

export function jobBoardSerializer(jobs: Job[]): SerializedJob[] {
  return jobs.map((job) => {
    const date = new Date(job.time).toLocaleString();
    console.log(date);

    return { ...job, date };
  });
}
