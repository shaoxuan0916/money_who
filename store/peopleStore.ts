import { useEffect } from "react"
import create from "zustand"
import { persist } from "zustand/middleware"

const peopleStore = (set: any) => ({
  allPeople: [],
  addAllPeople: (allPeople: any) => set({allPeople: allPeople}),
  removeAllPeople: () => set({ allPeople: null }),
})

const usePeopleStore = create(
    persist(peopleStore, {
      name: "people",
    })
  )



export default usePeopleStore