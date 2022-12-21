import { NextPage } from "next"
import { type } from "os"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IInputProps {
  label: string
  flex?: boolean
  type?: string
  placeholder?: string
  setValue: Dispatch<SetStateAction<any>>
  clearInput?: boolean
  setClearInput?: Dispatch<SetStateAction<any>>
}

const Input: NextPage<IInputProps> = ({
  label,
  flex,
  type,
  placeholder,
  setValue,
  clearInput,
  setClearInput,
}) => {
  const [val, setVal] = useState<any>("")

  const tempFunction = () => {
    setVal("")

    setClearInput && setClearInput(false)
  }

  useEffect(() => {
    tempFunction()
  }, [clearInput])

  return (
    <div className={flex ? "flex items-center w-full" : "my-8"}>
      <p
        className={
          flex ? "w-[130px] text-lg" : "text-xl font-semibold text-textColor"
        }
      >
        {label}
      </p>
      <input
        autoComplete="off"
        value={val}
        onFocus={(e: any) => e.target.select()}
        onChange={(e) => {
          setValue(e.target.value)
          setVal(e.target.value)
        }}
        placeholder={placeholder}
        type={type ? `${type}` : "text"}
        className={
          flex
            ? "py-1 px-2 ml-2 w-full rounded-md outline-borderColor bg-[#fff] text-textColor"
            : "border-2 w-full border-borderColor rounded-md px-2 py-1 mt-2 bg-[#fff] text-textColor"
        }
      />
    </div>
  )
}

export default Input
