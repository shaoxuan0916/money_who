import React, { useEffect, useState } from "react"
import Image from "next/image"
import logo from "../public/logo-no-background.svg"
import Input from "../components/Input"
import Button from "../components/Button"
import Link from "next/link"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from "../firebase"
import { useRouter } from "next/router"
import useAuthStore from "../store/authStore"

const SignUpPage = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const { addUser } = useAuthStore()

  const [errorMsg, setErrorMsg] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Todo:
  // const [username, setUsername] = useState("");

  let router = useRouter()

  const handleSignUp = (e: any) => {
    e.preventDefault()

    if (email === "" || password === "") {
      setErrorMsg("Email or Password cannot be empty")
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg("Password and confirm password doen't match")
      return
    }

    if (password.length < 8) {
      setErrorMsg("Password should at least 8 characters")
      return
    }

    createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    if (user) {
      // Signed in
      if (errorMsg) {
        setErrorMsg("")
      }

      // add new user to firestore
      try {
        setDoc(
          doc(db, "users", user.user.uid),
          {
            email: email,
            uid: user.user.uid,
          },
          { merge: true }
        )
        addUser(user.user)
        router.push(`/home/${user.user.uid}`)
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }

    if (error) {
      const errorMsg = error.message

      console.log("error", error)
      console.log("errorToString", errorMsg)

      if (errorMsg.includes("email-already-in-use")) {
        setErrorMsg("User Alreay Exist")
      } else if (errorMsg.includes("invalid-email")) {
        setErrorMsg("Invalid Email")
      } else if (errorMsg.includes("network-request-failed")) {
        setErrorMsg("Network error. Please check your network.")
      } else {
        setErrorMsg("Something Went Wrong. Please Try Again.")
      }
    }
  }, [user, error])

  return (
    <div className=" h-[100vh] bg-[#fff]">
      <div className="h-[25%] bg-green4 flex items-center justify-center">
        <div>
          <Image
            priority
            src={logo}
            alt="logo"
            style={{ width: "320px", height: "auto" }}
          />
        </div>
      </div>

      <div className="px-8 pt-12 max-w-[600px] mx-auto">
        <h3 className="text-4xl font-semibold text-textColor">Sign Up</h3>

        <div className="mt-8">
          {errorMsg && <p className="text-errorMsg">{errorMsg}</p>}

          {/* <Input label="Username" placeholder="min 6 characters" /> */}
          <form action="">
            <Input label="Email" placeholder="Your Email" setValue={setEmail} />
            <Input
              type="password"
              label="Password"
              placeholder="minimum 8 charaters"
              setValue={setPassword}
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-type your password"
              setValue={setConfirmPassword}
            />
          </form>
          <div onClick={handleSignUp}>
            <Button text={loading ? "Signing Up ..." : "Sign Up"} />
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
