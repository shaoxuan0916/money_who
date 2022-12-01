import React, { useState } from "react"
import Image from "next/image"
import logo from "../public/logo-no-background.svg"
import Input from "../components/Input"
import Button from "../components/Button"
import Link from "next/link"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import { useRouter } from "next/router"
import useAuthStore from "../store/authStore"

const SignUpPage = () => {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { addUser } = useAuthStore()

  // Todo:
  // const [username, setUsername] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("")

  let router = useRouter()

  const handleSignUp = (e: any) => {
    e.preventDefault()

    if (email === "" || password === "") {
      setError("Email or Password cannot be empty")
      return
    }

    // Todo: password checking

    // if() {
    //   return
    // }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setError("")

        const user = userCredential.user

        // add new user to firestore
        // try {
        //   const docRef = addDoc(collection(db, "users"), {
        //     email: email,
        //     uid: user.uid,
        //   })

        //   // console.log("docRef", docRef)
        // } catch (e) {
        //   console.error("Error adding document: ", e)
        // }

        // add user to authStore
        addUser(user)

        // redirect to home page
        router.push(`/home/${user.uid}`)
      })
      .catch((error) => {
        const errorMsg = error.toString()

        if (errorMsg.includes("email-already-in-use")) {
          setError("User Alreay Exist")
        } else if (errorMsg.includes("invalid-email")) {
          setError("Invalid Email")
        } else {
          setError("Something Went Wrong. Please Try Again.")
        }
      })
  }

  return (
    <div className=" h-[100vh] ">
      <div className="h-[25%] bg-green4 flex items-center justify-center">
        <div>
          <Image priority src={logo} alt="logo" width={320} height={200} />
        </div>
      </div>

      <div className="bg-white px-8 pt-12 max-w-[600px] mx-auto">
        <h3 className="text-4xl font-semibold">Sign Up</h3>

        <div className="mt-8">
          {error && <p className="text-errorMsg">{error}</p>}

          {/* <Input label="Username" placeholder="min 6 characters" /> */}
          <form action="">
            <Input label="Email" placeholder="Your Email" setValue={setEmail} />
            <Input
              type="password"
              label="Password"
              placeholder="min 8 charaters include upper and lower case"
              setValue={setPassword}
            />

            {/* <Input
            label="Confirm Password"
            placeholder="Re-type your password"
            setValue={setConfirmPassword}
          /> */}
          </form>
          <div onClick={handleSignUp}>
            <Button text="Sign Up" />
          </div>
          <div className="pt-2 text-green1">
            <Link href="/login">Already Have An Account? Login Now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
