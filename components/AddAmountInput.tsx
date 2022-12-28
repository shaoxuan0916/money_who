import React, { useState } from "react"
import Input from "./Input"

interface IAddAmountInputProps {
  currency: string
  member: any
  handleAddMoney: (addBy: any, amount: any) => void
}

const AddAmountInput = ({
  currency,
  member,
  handleAddMoney,
}: IAddAmountInputProps) => {
  const [amount, setAmount] = useState<number>(0)

  const [clearInput, setClearInput] = useState<boolean>(false)

  return (
    <div className="text-textColor flex items-center p-2 my-4">
      <Input
        setClearInput={setClearInput}
        clearInput={clearInput}
        type="number"
        flex
        placeholder={currency}
        label={member.name}
        setValue={setAmount}
      />

      <div
        onClick={() => {
          handleAddMoney(member?.uid, amount)
          setAmount(0)
          setClearInput(true)
        }}
        className={
          amount !== 0
            ? "ml-2 cursor-pointer bg-green1 text-green5 py-1 px-3 rounded-md"
            : "ml-2 cursor-pointer bg-[#333]/30 text-green5 py-1 px-3 rounded-md"
        }
      >
        Add
      </div>
    </div>
  )
}

export default AddAmountInput
