type JobType = "job";

export type Job = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: JobType;
  url: string;
};
