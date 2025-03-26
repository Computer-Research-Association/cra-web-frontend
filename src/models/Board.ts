import { Comment } from './Comment';

export interface BoardPageList {
  resListBoardDtos?: Board[];
  resBoardPinDtos?: Board[];
  totalPages?: number;
  totalBoards?: number;
}

export interface Board {
  id?: number;
  userId?: number;
  boardId?: number;
  title: string;
  category: number;
  content: string;
  imageUrls?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  pinedAt?: Date;
  isPined?: boolean;
  pidId?: number;

  // havrutaId?: number;
  likeCount?: number;
  viewerLiked?: boolean;
  likes: number;
  liked: boolean;
  view?: number;
  fileUrl?: string;
  commentCount?: number;
  resUserDetailDto: {
    name?: string;
    email?: string;
    studentId?: number;
    term?: string;
    githubId?: string;
    imgUrl?: string;
    greetingMessage?: string;
  };
  havrutaDto: {
    id?: 0;
    classname?: string;
    professor?: string;
  };
  resListCommentDtos?: Comment[];
}
export interface UpdateBoard {
  title: string;
  content: string;
  imageUrls?: string[];
  isChangedFile: boolean;
  deleted: boolean;
}
