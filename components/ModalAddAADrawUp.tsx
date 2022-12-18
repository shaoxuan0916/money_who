import { doc, updateDoc } from "firebase/firestore"
import { NextPage } from "next"
import React, { Dispatch, SetStateAction, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { db } from "../firebase"
import Button from "./Button"
import Input from "./Input"

interface IModalAddAADrawUpProps {
  setShowModal: Dispatch<SetStateAction<boolean>>
  membersList: any
  path: string
}

const ModalAddAADrawUp: NextPage<IModalAddAADrawUpProps> = ({
  setShowModal,
  membersList,
  path,
}) => {
  // TO FIXED: Add to firestore

  const [addTo, setAddTo] = useState<string>("")
  const [amount, setAmount] = useState<number>(0)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [clearInput, setClearInput] = useState<boolean>(false)

  const handleAdd = async (e: any) => {
    setErrorMsg("")

    e.preventDefault()

    if (amount === 0 || addTo === "") {
      setErrorMsg("Please fill in the blanks")

      return
    }

    updateAddToMoney(addTo)
    updateAddByMoney()

    setAmount(0)
    setAddTo("")
    setClearInput(true)
  }

  const updateAddToMoney = async (addTo: any) => {
    // update addTo other members (add amount to all of them)
    const addToRef = doc(db, path, `${addTo}`)

    const updatedAddToOtherMembersArr = membersList[addTo - 1].otherMembers.map(
      (item: any) => {
        return {
          name: item.name,
          uid: item.uid,
          money: Number(Number(Number(amount) + Number(item.money)).toFixed(2)),
        }
      }
    )

    await updateDoc(addToRef, {
      otherMembers: updatedAddToOtherMembersArr,
    })
  }

  const updateAddByMoney = () => {
    membersList &&
      Object.values(membersList).map(async (member: any) => {
        const addByUid = member.uid
        const addByRef = doc(db, path, `${addByUid}`)

        const updatedAddByOtherMembersArr = member.otherMembers.map(
          (item: any) => {
            if (item.uid === addTo) {
              return {
                name: item.name,
                uid: item.uid,
                money: Number(
                  Number(Number(item.money) - Number(amount)).toFixed(2)
                ),
              }
            } else return item
          }
        )

        await updateDoc(addByRef, {
          otherMembers: updatedAddByOtherMembersArr,
        })
      })
  }

  return (
    <div className="relative max-w-[600px]">
      <div className="absolute m-auto w-full h-[400px] top-[20%] left-0 p-6 z-20 shadow-lg rounded-lg bg-green4 ">
        {/* Modal Header */}
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">AA Draw Up</h3>
          <div
            onClick={() => setShowModal(false)}
            className="text-2xl font-semibold cursor-pointer"
          >
            <AiOutlineClose />
          </div>
        </div>

        {/* Modal Body */}
        <div className="pt-4">
          {/* Dropdown select who pays first */}
          <div className="mt-4">
            <h5 className="mb-4 text-xl font-semibold text-textColor">
              Who pays first:
            </h5>

            <select
              value={addTo}
              onChange={(e) => setAddTo(e.target.value)}
              name="who-pays"
              id="who-pays"
              className="w-full px-4 py-1 rounded-md"
            >
              <option value="">Select a member</option>

              {membersList &&
                Object.values(membersList).map((member, index) => {
                  return (
                    <option
                      className=""
                      // @ts-ignore
                      key={member?.uid}
                      // @ts-ignore
                      value={member?.uid}
                    >
                      {
                        // @ts-ignore
                        member?.name
                      }
                    </option>
                  )
                })}
            </select>
          </div>

          <Input
            label="Amount :"
            type="number"
            setValue={setAmount}
            clearInput={clearInput}
            setClearInput={setClearInput}
          />
        </div>

        {errorMsg && <div className="text-errorMsg pb-4">{errorMsg}</div>}

        <div onClick={handleAdd}>
          <Button text="Add" />
        </div>
      </div>
    </div>
  )
}

export default ModalAddAADrawUp
