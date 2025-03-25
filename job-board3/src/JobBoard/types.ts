export type Job = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type SerializedJob = {
  by: string;
  id: number;
  score: number;
  date: string;
  title: string;
  type: string;
  url: string;
};
