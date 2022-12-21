import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { useRouter } from "next/router"
import AddUserInput from "../../components/AddUserInput"
import Button from "../../components/Button"
import UserCards from "../../components/UserCards"
import ModalAddAADrawUp from "../../components/ModalAddAADrawUp"
import ModalClearAll from "../../components/ModalClearAll"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import useMembersStore from "../../store/membersStore"
import useAuthStore, { currencyOptions } from "../../store/authStore"

const HomePage = () => {
  const { userProfile, currency, updateCurrency } = useAuthStore()

  const path = `users/${userProfile?.uid}/members`

  // TODO: update members store
  const { updateMembers, allMembers } = useMembersStore()

  // query for react-firebase-hooks
  const query = collection(db, path)

  // from react-firebase-hooks
  const [docs, loading, error] = useCollectionData(query)

  const [newMember, setNewMember] = useState("")

  const [showAddModalAA, setShowModalAA] = useState(false)
  const [showModalClear, setShowModalClear] = useState(false)

  const newMemberUid = allMembers && Object.keys(allMembers).length + 1

  // new member's other members
  const newMemberOtherMembers =
    allMembers &&
    Object.keys(allMembers).map((member, index) => ({
      name: allMembers[index].name,
      uid: allMembers[index].uid,
      money: Number(0),
    }))

  // add new member
  const handleAdd = async () => {
    if (newMember === "" || newMember === undefined) return
    setNewMember("")

    const docRef = doc(db, path, `${newMemberUid}`)

    // add new member to old member(s)'s other members
    Object.keys(allMembers).map((member, index) => {
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
  }

  // function update old member(s)'s other members
  const updateOtherMembers = async (newMember: any, uid: any, index: any) => {
    const currentDocRef = doc(db, path, `${index + 1}`)

    // previous other members
    const oldOtherMembers = allMembers[index]?.otherMembers

    // updated other members
    const newOtherMembersArr = [
      ...oldOtherMembers,
      { name: newMember, uid: uid, money: 0 },
    ]

    await setDoc(
      currentDocRef,
      {
        otherMembers: newOtherMembersArr,
      },
      {
        merge: true,
      }
    )
  }

  // function clear all members
  const handleClearMember = () => {
    Object.keys(allMembers).map((member, index) => {
      handleDeleteDoc(index)
    })

    setShowModalClear(false)
  }

  const handleDeleteDoc = async (index: any) => {
    const docRef = doc(db, `${path}/${index + 1}`)
    await deleteDoc(docRef)
  }

  useEffect(() => {
    updateMembers(docs)
  }, [docs])

  return (
    <div className="max-w-[600px] mx-auto bg-green2 min-h-[100vh]">
      <Navbar />
      {loading ? (
        <div className="mt-8 px-4 text-textColor">Loading...</div>
      ) : (
        <div className="pt-12 px-4">
          {/* Add New User Input */}
          <AddUserInput
            value={newMember}
            setValue={setNewMember}
            handleAdd={handleAdd}
          />

          {/* AA Draw Up button */}
          {allMembers?.length > 0 && (
            <div onClick={() => setShowModalAA(true)} className="my-8">
              <Button text="AA Draw Up" />
            </div>
          )}
          {showAddModalAA && (
            <ModalAddAADrawUp
              setShowModal={setShowModalAA}
              membersList={allMembers}
              path={path}
            />
          )}

          {/* clear all users and currency*/}

          {allMembers?.length > 0 &&
            Object.keys(currencyOptions).length > 0 && (
              <div className="flex justify-between items-center">
                <div>
                  <div className="">
                    <select
                      value={currency}
                      // @ts-ignore
                      onChange={(e) => updateCurrency(e.target.value)}
                      name="who-pays"
                      id="who-pays"
                      className="w-[130px] px-2 py-1 rounded-md bg-[#fff] text-textColor"
                    >
                      <option value="">Select a currency</option>

                      {currencyOptions &&
                        Object.values(currencyOptions).map(
                          (currency, index) => {
                            return (
                              <option key={index} value={currency}>
                                {currency}
                              </option>
                            )
                          }
                        )}
                    </select>
                  </div>
                </div>
                <div
                  onClick={() => setShowModalClear(true)}
                  className="text-textColor cursor-pointer text-right w-[100px] justify text-lg font-semibold"
                >
                  clear
                </div>
              </div>
            )}
          {showModalClear && (
            <ModalClearAll
              handleClearMember={handleClearMember}
              setShowModal={setShowModalClear}
            />
          )}

          {/* User Card */}
          {/* {loading ? (
          <div className="mt-8 text-textColor">Loading...</div>
        ) : ( */}
          <div className="">
            {allMembers && allMembers.length > 0 ? (
              <UserCards
                currency={currency}
                path={path}
                membersList={allMembers}
              />
            ) : (
              <div className="text-lg mt-16 pl-2">No member yet :(</div>
            )}
          </div>
          {/* )} */}
        </div>
      )}
    </div>
  )
}

export default HomePage
