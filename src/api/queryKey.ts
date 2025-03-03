export const QUERY_KEY = {
  board: {
    boards: (category: number, currentPage: number) =>
      ['board.boards', category, currentPage] as const,
    boardById: (id: number) => ['board.boardById', id] as const,
  },
  comment: {
    commentsById: (id: number) => ['comment.commentsById', id],
    commentsCountById: (id: number) =>
      ['comment.commentsCountById', id] as const,
  },
  project: {
    projects: (currentPage: number) =>
      ['project.projects', currentPage] as const,
    projectById: (id: number) => ['project.projectById', id] as const,
  },

  item: {
    items: (itemCategory: number, currentPage: number) =>
      ['item.items', itemCategory, currentPage] as const,
    itemById: (id: number) => ['item.itemById', id] as const,
  },

  havruta: {
    havrutas: () => ['havruta.havrutas'] as const,
    havrutaById: (id: number) => ['havruta.havrutaById', id] as const,
  },
  havrutaBoard: {
    havrutaBoards: (currnetPage: number) =>
      ['havrutaBoard.havrutaBoards', currnetPage] as const,
    havrutaBoardById: (id: number) =>
      ['havrutaBoard.havrutaBoardById', id] as const,
    havrutaBoardsByHavrutaId: (havrutaId: number, currentPage: number) =>
      [
        'havrutaBoard.havrutaBoardsByHavrutaId',
        havrutaId,
        currentPage,
      ] as const,
    havrutaBoardsCountByHavrutaId: (havrutaId: number) =>
      ['havrutaBoard.havrutaBoardsByHavrutaId', havrutaId] as const,
  },

  signUpCode: {
    signUpCode: (length: number) => ['signUpCode.signUpCode', length] as const,
  },
};
