import { doc, updateDoc } from "firebase/firestore"
import { NextPage } from "next"
import React, { Dispatch, SetStateAction } from "react"
import { getDatabase, ref, onDisconnect } from "firebase/database"
import toast from "react-hot-toast"
import { AiOutlineClose } from "react-icons/ai"
import { db } from "../firebase"
import { CurrencyType } from "../store/authStore"
import AddAmountInput from "./AddAmountInput"

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
  const selectedMemberDetails = membersList?.find(
    (item) => item.uid === selectedMember
  )

  // function add money --> when click "add" button
  const handleAddMoney = async (addBy: any, amount: any) => {
    // addTo is owner

    if (!amount) {
      return
    }

    const addTo = selectedMember

    await updateMoney(addTo, addBy, amount)
      .then((doc) => {
        console.log("success", doc)
      })
      .catch((error) => {
        console.log("errorrrrrr", error)
      })

    toast.success(`${currency} ${amount} successfully added`)
  }

  const updateMoney = async (addTo: any, addBy: any, amount: any) => {
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
        updateDoc(addToRef, {
          otherMembers: updatedAddToOtherMembersArr,
        }),
        // update addBy
        updateDoc(addByRef, {
          otherMembers: updatedAddByOtherMembersArr,
        }),
      ]))
  }

  return (
    <div className="fixed bg-[#333]/75 top-0 bottom-0 left-0 right-0 z-999 max-w-[600px] mx-auto flex items-center">
      <div className="m-auto max-w-[600px] w-full z-1000  shadow-2xl rounded-lg bg-green4 ">
        {/* Modal Header */}
        <div className="flex justify-between pb-2 shadow-md">
          <h3 className="text-xl font-semibold text-textColor pl-6 pb-2 pt-4">
            {selectedMemberDetails.name}
          </h3>
          <div
            onClick={() => setShowModal(false)}
            className="text-2xl font-semibold cursor-pointer text-textColor pr-6 pb-2 pt-4"
          >
            <AiOutlineClose />
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-6 max-h-[400px] overflow-y-scroll">
          {membersList &&
            Object.keys(membersList).map(
              (member, index) =>
                member !== selectedMemberIndex.toString() && (
                  <div key={index}>
                    <AddAmountInput
                      currency={currency}
                      member={membersList[index]}
                      handleAddMoney={handleAddMoney}
                    />
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  )
}

export default ModalAdd
