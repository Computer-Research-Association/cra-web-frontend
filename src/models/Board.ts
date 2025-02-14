export interface Board {
  id?: number;
  userId?: number;
  title: string;
  category: number;
  content: string;
  imageUrls?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  havrutaId?: number;
  like?: number;
  view?: number;
  resUserDetailDto: {
    name?: string;
    email?: string;
    studentId?: number;
    term?: string;
    githubId?: string;
    imgUrl?: string;
  };
  havrutaDto?: {
    id?: number | null;
    classname?: string;
    professor?: string;
  };
  fileUrl?: string;
}

export interface UpdateBoard {
  title: string;
  content: string;
  imageUrls?: string[];
  isChangedFile: boolean;
  deleted: boolean;
}
