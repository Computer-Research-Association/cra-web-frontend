// ex) 기능: paramater -> return value

// 로그인: Login -> ResponseLogin(ResUserDetail & ResTokenDto)

// 회원가입: ReqSignUp -> ResSignUp

// 토큰 재발급: ReissueToken -> ResTokenDto

interface ReqSignUp {
  username: string;
  password: string;
  email: string;
  name: string;
  githubId: string;
  studentId: number;
  term: string;
  code: string;
}

interface ResSignUp {
  // no password
  id: number;
  username: string;
  email: string;
  name: string;
  githubId: string;
  studentNumber: number;
  term: string;
}

interface ReissueToken {
  userId: number;
  refreshToken: string;
}

interface ResTokenDto {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

interface Login {
  username: string;
  password: string;
}

interface ResUserDetail {
  name: string;
  email: string;
  studentId: number;
  term: string;
  githubId: string;
  imgUrl: string;
  greetingMessage: string;
}

interface ResponseLogin {
  resUserDetailDto: ResUserDetail;
  resTokenDto: ResTokenDto;
}

export type {
  ReqSignUp,
  ResSignUp,
  ReissueToken,
  Login,
  ResTokenDto,
  ResUserDetail,
  ResponseLogin,
};
