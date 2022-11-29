import { NextPage } from "next"
import { type } from "os"
import React, { Dispatch, SetStateAction, useState } from "react"

interface IInputProps {
  label: string
  type?: string
  placeholder?: string
  setValue: Dispatch<SetStateAction<any>>
}

const Input: NextPage<IInputProps> = ({
  label,
  type,
  placeholder,
  setValue,
}) => {
  return (
    <div className="my-8">
      <p className="text-xl font-semibold text-textColor">{label}</p>
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        type={type ? `${type}` : "text"}
        className="border-2 w-full border-borderColor rounded-md px-2 py-1 mt-2 "
      />
    </div>
  )
}

export default Input
