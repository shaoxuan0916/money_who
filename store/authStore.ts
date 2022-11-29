import { useEffect } from "react"
import create from "zustand"
import { persist } from "zustand/middleware"
import { onAuthStateChanged } from "firebase/auth"

const authStore = (set: any) => ({
  allUsers: null,
  userProfile: null,
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  addAllUsers: (allUsers: any) => set({ allUsers: allUsers }),
  removeAllUsers: () => set({ allUsers: null }),
 
})

const useAuthStore = create(
    persist(authStore, {
      name: "auth",
    })
  )



export default useAuthStore