import { create } from 'zustand';

interface UserState {
  name: string;
  email: string;
  studentId: number;
  term: string;
  githubId: string;
  imgUrl: string;
  greetingMessage: string;
  setUser: (_user: Partial<UserState>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: localStorage.getItem('name') || '',
  email: localStorage.getItem('email') || '',
  studentId: Number(localStorage.getItem('studentId')) || 0,
  term: localStorage.getItem('term') || '',
  githubId: localStorage.getItem('githubId') || '',
  imgUrl: localStorage.getItem('imgUrl') || '',
  greetingMessage: localStorage.getItem('greetingMessage') || '',

  setUser: (user) => {
    set(user);
    Object.entries(user).forEach(([key, value]) => {
      localStorage.setItem(key, value as string);
    });
  },

  resetUser: () => {
    set({
      name: '',
      email: '',
      studentId: 0,
      term: '',
      githubId: '',
      imgUrl: '',
      greetingMessage: '',
    });
  },
}));
