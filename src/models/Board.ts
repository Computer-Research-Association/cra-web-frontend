import { Comment } from './Comment';

export interface BoardPageList {
  resListBoardDtoList?: Board;
  totalPages?: number;
}

export interface Board {
  id?: number;
  userId?: number;
  title: string;
  category: number;
  content: string;
  imageUrls?: string[];
  createdAt?: Date;
  updatedAt?: Date;
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
