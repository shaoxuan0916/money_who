import { collection, doc, query, updateDoc } from "firebase/firestore"
import { NextPage } from "next"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { AiOutlineClose } from "react-icons/ai"
import { db } from "../firebase"
import Input from "./Input"

interface IModalAddProps {
  path: string
  selectedMember: number
  selectedMemberIndex: number
  setShowModal: Dispatch<SetStateAction<boolean>>
  membersList: any[] | null
}

const ModalAdd: NextPage<IModalAddProps> = ({
  selectedMember,
  selectedMemberIndex,
  setShowModal,
  membersList,
  path,
}) => {
  const [amount, setAmount] = useState<number>(0)
  const [clearInput, setClearInput] = useState<boolean>(false)

  // console.log("memberList", membersList)

  const selectedMemberDetails = membersList?.find(
    (item) => item.uid === selectedMember
  )

  // console.log("selectedMemberDetails", selectedMemberDetails)

  // function add money --> when click "add" button
  const handleAddMoney = (addBy: any) => {
    // addTo is owner
    const addTo = selectedMember

    // console.log("addBy, addTo", addBy, addTo)

    setAmount(0)
    setClearInput(true)
    updateMoney(addTo, addBy)
  }

  const updateMoney = async (addTo: any, addBy: any) => {
    // updated "addTo"'s otherMembers Array
    const updateIndex =
      selectedMemberDetails.otherMembers &&
      Object.values(selectedMemberDetails.otherMembers).findIndex(
        (item: any) => item.uid === addBy
      )

    // calculate amount after changes
    const updatedAddToAmount =
      Number(selectedMemberDetails?.otherMembers[updateIndex].money) +
      Number(amount)

    const updatedAddByAmount = updatedAddToAmount * -1

    // find addBy index and otherMembersArr

    const updateAddByIndex =
      membersList &&
      Object.values(membersList)?.findIndex((item) => item.uid === addBy)

    // @ts-ignore
    const updateAddByArr = membersList[updateAddByIndex].otherMembers

    const updateAddByOtherMembersIndex = Object.keys(updateAddByArr).findIndex(
      (index) => updateAddByArr[index].uid === addTo
    )

    const addToRef = doc(db, path, `${addTo}`)
    const addByRef = doc(db, path, `${addBy}`)

    // update latest money status to firestore
    membersList &&
      (await Promise.all([
        // update addTo
        await updateDoc(addToRef, {
          otherMembers: {
            ...selectedMemberDetails.otherMembers,
            [updateIndex]: {
              ...selectedMemberDetails?.otherMembers[updateIndex],
              money: Number(updatedAddToAmount),
            },
          },
        }),

        // update addBy
        await updateDoc(addByRef, {
          otherMembers: {
            // @ts-ignore
            ...updateAddByArr,
            [updateAddByOtherMembersIndex]: {
              // @ts-ignore
              ...updateAddByArr[updateAddByOtherMembersIndex],
              money: Number(updatedAddByAmount),
            },
          },
        }),
      ]))
  }

  return (
    <div className="absolute m-auto w-full h-auto max-h-[600px] top-0 left-0 p-6 z-20 shadow-lg rounded-lg bg-green4 ">
      {/* Modal Header */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{selectedMemberDetails.name}</h3>
        <div
          onClick={() => setShowModal(false)}
          className="text-2xl font-semibold cursor-pointer"
        >
          <AiOutlineClose />
        </div>
      </div>

      {/* Modal Body */}
      <div className="pt-4">
        {membersList &&
          Object.keys(membersList).map(
            (member, index) =>
              member !== selectedMemberIndex.toString() && (
                <div
                  key={index}
                  className="text-textColor flex items-center p-2 my-4"
                >
                  <Input
                    setClearInput={setClearInput}
                    clearInput={clearInput}
                    type="number"
                    flex
                    label={membersList[index].name}
                    setValue={setAmount}
                  />
                  {/* <h5 className="w-[25%] text-lg">
                    {membersList[index].name} {` `}
                  </h5>
                  <input
                    value={amount}
                    onChange={(e: any) => setAmount(e.target.value)}
                    type="number"
                    className="py-1 px-2 w-[60%] rounded-md outline-borderColor"
                  /> */}

                  <div
                    onClick={() => handleAddMoney(membersList[index].uid)}
                    className="ml-2 cursor-pointer bg-green1 text-green5 py-1 px-3 rounded-md"
                  >
                    Add
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  )
}

export default ModalAdd
