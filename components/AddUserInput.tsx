import { NextPage } from "next"
import React, { Dispatch, SetStateAction, useState } from "react"

interface IAddUserInputProps {
  value: any
  setValue: Dispatch<SetStateAction<any>>
}

const AddUserInput: NextPage<IAddUserInputProps> = ({ setValue, value }) => {
  return (
    <div className="flex ">
      <input
        type="text"
        placeholder="Add new user"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 rounded-l-md outline-none"
      />

      <div
        className="bg-green1 rounded-r-md py-2 px-6 cursor-pointer hover:bg-green1hover"
        onClick={() => setValue("")}
      >
        <p className="text-[#fff] text-xl font-semibold">Add</p>
      </div>
    </div>
  )
}

export default AddUserInput
