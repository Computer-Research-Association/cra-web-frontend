interface User {
  id?: number;
  name: string;
  email: string;
  studentId: number;
  term: string;
  githubId: string;
  delete?: true;
  createdAt?: Date;
  updatedAt?: Date;
  imageUrl?: string;
  greetingMessage: string;
}

interface UserPassWord {
  username: string;
  code: string;
  password: string;
}

export type { User, UserPassWord };
