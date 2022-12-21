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

  const membersNumber = Number(membersList?.length)

  const handleAdd = async (e: any) => {
    setErrorMsg("")

    e.preventDefault()

    if (amount === 0 || addTo === "") {
      setErrorMsg("Please fill in the blanks")
      return
    }

    let dividedAmount = amount / membersNumber

    await Promise.all([
      // update all add by(s) other members list
      updateAddByMoney(dividedAmount),
      // update add to other members list
      updateAddToMoney(addTo, dividedAmount),
    ])

    setAmount(0)
    setAddTo("")
    setClearInput(true)

    // Todo: add notify
    setShowModal(false)
  }

  // update addTo other members (add amount to all of them)
  const updateAddToMoney = (addTo: any, dividedAmount: number) => {
    const addToRef = doc(db, path, `${addTo}`)

    const updatedAddToOtherMembersArr = membersList[addTo - 1].otherMembers.map(
      (item: any) => {
        return {
          name: item.name,
          uid: item.uid,
          money: Number(
            Number(Number(item.money) + Number(dividedAmount)).toFixed(2)
          ),
        }
      }
    )

    // console.log("addTo", addToRef, updatedAddToOtherMembersArr)
    updateDoc(addToRef, {
      otherMembers: updatedAddToOtherMembersArr,
    })
  }

  // update all addBy(s) other members (add amount to all of them)
  const updateAddByMoney = (dividedAmount: number) => {
    membersList &&
      Object.values(membersList).map((member: any) => {
        const addByUid = member.uid
        const addByRef = doc(db, path, `${addByUid}`)

        // find current addBy's other members
        const updatedAddByOtherMembersArr = member.otherMembers.map(
          (item: any) => {
            if (item.uid === Number(addTo)) {
              return {
                name: item.name,
                uid: item.uid,
                money: Number(
                  Number(Number(item.money) - Number(dividedAmount)).toFixed(2)
                ),
              }
            } else return item
          }
        )

        // console.log("addBy", addByRef, updatedAddByOtherMembersArr)
        updateDoc(addByRef, {
          otherMembers: updatedAddByOtherMembersArr,
        })
      })
  }

  return (
    <div className="relative max-w-[600px]">
      <div className="absolute m-auto w-full h-[400px] top-[20%] left-0 p-6 z-20 shadow-lg rounded-lg bg-green4 ">
        {/* Modal Header */}
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-textColor">AA Draw Up</h3>
          <div
            onClick={() => setShowModal(false)}
            className="text-2xl font-semibold cursor-pointer text-textColor"
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
              className="w-full px-4 py-1 rounded-md text-textColor bg-[#fff]"
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
