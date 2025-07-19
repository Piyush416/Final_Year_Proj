import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import { createAxiosInstance } from '../axios/axiosInstance'
import axios from 'axios'

export const useAuthStore = create(
    persist(
        (set) => ({
            userDate:null,
            isAuthenticated:false,

            setUser:(userdata) => 
                set({
                    user:userdata,
                    isAuthenticated:true
                }),

            logout:() => 
                set({
                    user:null,
                    isAuthenticated:false
                }),
            
                checkAuth:async() => {
                    try {
                        const {data} = await axios.get("/api/checkUser")
                        console.log("User Data:", data)
                        set({
                            userDate:data.data,
                            isAuthenticated:true
                        })
                    } catch (error) {
                        set({ user: null, isAuthenticated: false });
                    }
                }
        }),
        {
            name:'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
)