export type User = {
  id: string;
  email: string;
  provider: "credentials";
};

export type Project = {
  id: string;
  name: string;
  description?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
};
