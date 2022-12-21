import { setDoc, collection } from "firebase/firestore"
import { NextPage } from "next"
import React, { Dispatch, SetStateAction, useState } from "react"
import { db } from "../firebase"

interface IAddUserInputProps {
  value: any
  setValue: Dispatch<SetStateAction<any>>
  handleAdd: () => void
}

const AddUserInput: NextPage<IAddUserInputProps> = ({
  setValue,
  value,
  handleAdd,
}) => {
  return (
    <div className="flex ">
      <input
        type="text"
        placeholder="Add new member"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 rounded-l-md outline-none bg-[#fff] text-textColor"
      />

      <div
        className="bg-green1 rounded-r-md py-2 px-6 cursor-pointer hover:bg-green1hover"
        onClick={handleAdd}
      >
        <p className="text-[#fff] text-xl font-semibold">Add</p>
      </div>
    </div>
  )
}

export default AddUserInput
