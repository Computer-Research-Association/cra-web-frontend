interface Comment {
  id?: number;
  userId: number;
  boardId?: number;
  content: string;
  commentList: Comment[];
  likeCount?: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  havrutaDto: {
    id: number | null;
    classname: string;
    professor: string;
  };
  resUserDetailDto: {
    name: string;
    email: string;
    studentId: number;
    term: string;
    githubId: string;
    imgUrl: string;
    greetingMessage: string;
  };
}

export type { Comment }; //props 로 전달달
