import { NextPage } from "next"
import React from "react"

interface IButtonProps {
  text: string
  outline?: boolean
}

const Button: NextPage<IButtonProps> = ({ text, outline }) => {
  return (
    <div className="w-full">
      <div
        className={
          outline
            ? "bg-green4 flex justify-center py-2 rounded-md cursor-pointer hover:bg-green3/80 border-2 border-green1"
            : "bg-green1 flex justify-center py-2 rounded-md cursor-pointer hover:bg-green1hover"
        }
      >
        <p
          className={
            outline
              ? "text-green1 text-xl font-semibold"
              : "text-[#fff] text-xl font-semibold"
          }
        >
          {text}
        </p>
      </div>
    </div>
  )
}

export default Button
