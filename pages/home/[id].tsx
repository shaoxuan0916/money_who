import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import useAuthStore from "../../store/authStore"
import { auth, db } from "../../firebase"
import { useRouter } from "next/router"
import AddUserInput from "../../components/AddUserInput"
import Button from "../../components/Button"
import UserCards from "../../components/UserCards"
import ModalAddAADrawUp from "../../components/ModalAddAADrawUp"
import ModalClearAll from "../../components/ModalClearAll"
import usePeopleStore from "../../store/peopleStore"

const HomePage = () => {
  const router = useRouter()

  const [newPerson, setNewPerson] = useState("")
  const [peopleList, setPeopleList] = useState<any[]>([])

  const [showAddModalAA, setShowModalAA] = useState(false)
  const [showModalClear, setShowModalClear] = useState(false)

  const { userProfile } = useAuthStore()
  const { addAllPeople, allPeople } = usePeopleStore()

  const handleAdd = async () => {
    setNewPerson("")
  }

  return (
    <div className="max-w-[600px] mx-auto bg-green2 min-h-[100vh]">
      <Navbar />

      <div className="pt-12 px-4">
        {/* Add New User Input */}
        <AddUserInput
          value={newPerson}
          setValue={setNewPerson}
          handleAdd={handleAdd}
        />

        {/* AA Draw Up button */}
        <div onClick={() => setShowModalAA(true)} className="py-8">
          <Button text="AA Draw Up" />
        </div>
        {showAddModalAA && <ModalAddAADrawUp setShowModal={setShowModalAA} />}

        {/* clear all users */}
        <div
          onClick={() => setShowModalClear(true)}
          className="cursor-pointer w-full text-right text-lg font-semibold"
        >
          clear
        </div>
        {showModalClear && <ModalClearAll setShowModal={setShowModalClear} />}

        {/* User Card */}
        <UserCards peopleList={peopleList} />
      </div>
    </div>
  )
}

export default HomePage
