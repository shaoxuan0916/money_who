import { NextPage } from "next"
import React, { Dispatch, SetStateAction } from "react"

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
        className="w-full px-4 rounded-l-md outline-none bg-green4 text-textColor"
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
