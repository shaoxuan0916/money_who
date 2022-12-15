import { useEffect } from "react"
import create from "zustand"
import { persist } from "zustand/middleware"

const membersStore = (set: any) => ({
  allMembers: [],
  addAllMembers: (allPeople: any) => set({allPeople: allPeople}),
  removeAllMembers: () => set({ allPeople: null }),
})

const useMembersStore = create(
    persist(membersStore, {
      name: "member",
    })
  )



export default useMembersStore