import { doc, updateDoc } from "firebase/firestore"
import { NextPage } from "next"
import React, { Dispatch, SetStateAction, useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineClose } from "react-icons/ai"
import { db } from "../firebase"
import { CurrencyType } from "../store/authStore"
import Input from "./Input"

interface IModalAddProps {
  path: string
  selectedMember: number
  selectedMemberIndex: number
  setShowModal: Dispatch<SetStateAction<boolean>>
  membersList: any[] | null
  currency: CurrencyType
}

const ModalAdd: NextPage<IModalAddProps> = ({
  selectedMember,
  selectedMemberIndex,
  setShowModal,
  membersList,
  path,
  currency,
}) => {
  const [amount, setAmount] = useState<number>(0)
  const [clearInput, setClearInput] = useState<boolean>(false)

  const selectedMemberDetails = membersList?.find(
    (item) => item.uid === selectedMember
  )

  // function add money --> when click "add" button
  const handleAddMoney = (addBy: any) => {
    // addTo is owner

    if (!amount) {
      return
    }

    const addTo = selectedMember

    setAmount(0)
    setClearInput(true)
    updateMoney(addTo, addBy)

    toast.success(`${currency} ${amount} successfully added`)
  }

  const updateMoney = async (addTo: any, addBy: any) => {
    // updated "addTo"'s otherMembers Array
    const updateIndex =
      selectedMemberDetails.otherMembers &&
      Object.values(selectedMemberDetails.otherMembers).findIndex(
        (item: any) => item.uid === addBy
      )

    // calculate amount after changes
    const updatedAddToAmount = Number(
      (
        Number(selectedMemberDetails?.otherMembers[updateIndex].money) +
        Number(amount)
      ).toFixed(2)
    )

    const updatedAddByAmount = updatedAddToAmount * -1

    // find addBy index and otherMembersArr

    const updateAddByIndex =
      membersList &&
      Object.values(membersList)?.findIndex((item) => item.uid === addBy)

    // @ts-ignore
    const updateAddByArr = membersList[updateAddByIndex].otherMembers

    const addToRef = doc(db, path, `${addTo}`)
    const addByRef = doc(db, path, `${addBy}`)

    const updatedAddToOtherMembersArr = selectedMemberDetails.otherMembers.map(
      (item: any) => {
        if (item.uid === addBy) {
          return {
            name: item.name,
            uid: item.uid,
            money: updatedAddToAmount,
          }
        } else return item
      }
    )

    const updatedAddByOtherMembersArr = updateAddByArr.map((item: any) => {
      if (item.uid === addTo) {
        return {
          name: item.name,
          uid: item.uid,
          money: updatedAddByAmount,
        }
      } else return item
    })

    // update latest money status to firestore
    membersList &&
      (await Promise.all([
        // update addTo
        await updateDoc(addToRef, {
          otherMembers: updatedAddToOtherMembersArr,
        }),

        // update addBy
        await updateDoc(addByRef, {
          otherMembers: updatedAddByOtherMembersArr,
        }),
      ]))
  }

  return (
    <div className="fixed bg-[#333]/75 top-0 bottom-0 left-0 right-0 z-999 max-w-[600px] mx-auto">
      <div className="fixed m-auto max-w-[600px] max-h-[500px] overflow-y-scroll top-0 left-0 bottom-0 right-0 z-1000 p-6 z-20 shadow-2xl rounded-lg bg-green4 ">
        {/* Modal Header */}
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-textColor">
            {selectedMemberDetails.name}
          </h3>
          <div
            onClick={() => setShowModal(false)}
            className="text-2xl font-semibold cursor-pointer text-textColor"
          >
            <AiOutlineClose />
          </div>
        </div>

        {/* Modal Body */}
        <div className="pt-4  ">
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
                      placeholder={currency}
                      label={membersList[index].name}
                      setValue={setAmount}
                    />

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
    </div>
  )
}

export default ModalAdd
