import axios from "axios";
import { create } from "zustand";

interface User {
  username: string;
  email: string;
  profile: {
    type: string;
    name: string;
    image: string;
    about: string;
  };
}

interface Pet {
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  user: User | null;
  setUser: (user: User | null) => void;

  registerUser: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  updateProfile: (profile: { type: string; name: string; image: string; about: string }) => Promise<void>;
}

export const usePet = create<Pet>((set, get) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  user: null,
  setUser: (user) => set({ user }),

  registerUser: async (username, email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/register", {
        username,
        email,
        password,
      });
      set({ user: response.data.user });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Kayıt hatası");
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/login", {
        email,
        password,
      });
      set({ user: response.data.user });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Giriş hatası");
    }
  },

  updateProfile: async (profile) => {
    try {
      const user = get().user;
      if (!user) throw new Error("Kullanıcı bulunamadı");
      const response = await axios.put("http://127.0.0.1:5000/api/profile", {
        email: user.email,
        profile: {
          type: profile.type,
          name: profile.name,
          image: profile.image,
          about: profile.about,
        },
      });
      set({ user: { ...user, profile: response.data.profile } });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Profil güncelleme hatası");
    }
  },
}));