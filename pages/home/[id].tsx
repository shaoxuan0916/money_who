import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { useRouter } from "next/router"
import AddUserInput from "../../components/AddUserInput"
import Button from "../../components/Button"
import UserCards from "../../components/UserCards"
import ModalAddAADrawUp from "../../components/ModalAddAADrawUp"
import ModalClearAll from "../../components/ModalClearAll"
import { useCollectionData } from "react-firebase-hooks/firestore"
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { auth, db } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import useMembersStore from "../../store/membersStore"

const HomePage = () => {
  const router = useRouter()

  const [user] = useAuthState(auth)

  const path = `users/${user?.uid}/members`

  // update members store
  const { addAllMembers, removeAllMembers } = useMembersStore()

  // query for react-firebase-hooks
  const query = collection(db, path)

  // from react-firebase-hooks
  const [docs, loading, error] = useCollectionData(query)

  const [newMember, setNewMember] = useState("")
  const [membersList, setMembersList] = useState<any>([])

  const [showAddModalAA, setShowModalAA] = useState(false)
  const [showModalClear, setShowModalClear] = useState(false)

  const newMemberUid = membersList && Object.keys(membersList).length + 1

  // new member's other members
  const newMemberOtherMembers =
    membersList &&
    Object.keys(membersList).map((member, index) => ({
      name: membersList[index].name,
      uid: membersList[index].uid,
      money: Number(0),
    }))

  // add new member
  const handleAdd = async () => {
    if (newMember === "" || newMember === undefined) return

    const docRef = doc(db, path, `${newMemberUid}`)

    // add new member to old member(s)'s other members
    Object.keys(membersList).map((member, index) => {
      updateOtherMembers(newMember, newMemberUid, index)
    })

    await setDoc(
      docRef,
      {
        name: newMember,
        uid: newMemberUid,
        otherMembers: newMemberOtherMembers,
      },
      { merge: true }
    )

    setNewMember("")
  }

  // function update old member(s)'s other members
  const updateOtherMembers = async (newMember: any, uid: any, index: any) => {
    const currentDocRef = doc(db, path, `${index + 1}`)

    const oldOtherMembers = membersList[index]?.otherMembers

    console.log("oldOtherMembers", oldOtherMembers)

    const newOtherMembersArr = [
      ...oldOtherMembers,
      { name: newMember, uid: uid, money: 0 },
    ]

    await updateDoc(currentDocRef, {
      otherMembers: newOtherMembersArr,
    })
  }

  // function clear all members
  const handleClearMember = () => {
    Object.keys(membersList).map((member, index) => {
      handleDeleteDoc(index)
    })

    setShowModalClear(false)
  }

  const handleDeleteDoc = async (index: any) => {
    const docRef = doc(db, `${path}/${index + 1}`)
    await deleteDoc(docRef)
  }

  useEffect(() => {
    setMembersList(docs)
  }, [docs])

  return (
    <div className="max-w-[600px] mx-auto bg-green2 min-h-[100vh]">
      <Navbar />

      <div className="pt-12 px-4">
        {/* Add New User Input */}
        <AddUserInput
          value={newMember}
          setValue={setNewMember}
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
        {showModalClear && (
          <ModalClearAll
            handleClearMember={handleClearMember}
            setShowModal={setShowModalClear}
          />
        )}

        {/* User Card */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <UserCards path={path} membersList={membersList} />
        )}
      </div>
    </div>
  )
}

export default HomePage
