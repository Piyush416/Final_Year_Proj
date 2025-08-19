import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null, // ✅ use consistent naming
            isAuthenticated: false,

            setUser: (userdata) =>
                set({
                    user: userdata,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),

            checkAuth: async () => {
                try {
                    const { data } = await axios.get("/api/checkUser");
                    console.log("User Data from store:", data);
                    set({
                        user: data.data.result, // ✅ update the same key
                        isAuthenticated: true,
                    });
                } catch (error) {
                    set({ user: null, isAuthenticated: false, isProfileDataAvailable: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
