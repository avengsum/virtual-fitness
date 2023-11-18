'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import EmailIcon from '@/componets/EmailIcon'
import Link from 'next/link'
import { SignInButton } from "@clerk/nextjs";

const page = () => {
  const router = useRouter()
  const [username , setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState();

  const {isLoaded ,signUp , setActive} = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username,password,email)

    if(!isLoaded){
      return;
    }
    try {

      await signUp.create({
        username,
        password,
        emailAddress:email,
      });
      await signUp.prepareEmailAddressVerification({strategy:'email_code'})
      setPendingVerification(true)
      
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }

  }

  const onPressVerify = async (e) => {
    e.preventDefault();
    
    if(!isLoaded){
      return;
    }

    try {
      const completeSignup = await signUp.attemptEmailAddressVerification({code,})

      if(completeSignup !== "complete"){
        console.log(JSON.stringify(completeSignup, null, 2));

      }
      if(completeSignup == "complete"){
        await setActive({session:completeSignup.createdSessionId});
        router.push('/')
      }

    } catch (error) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <div>
      { !pendingVerification && (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">
            Sign up for Virtual Fitness
          </h1>
          <div className="w-full flex-1 mt-8">
            <div className="flex flex-col items-center">
              <SignInButton>
              <button
                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
              >
                <div className="bg-white p-2 rounded-full">
                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span className="ml-4">
                  Sign Up with Google
                </span>
              </button>
              </SignInButton>
            </div>

            <div className="my-12 border-b text-center">
              <div
                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
              >
                Or sign up with e-mail
              </div>
            </div>

            <div className="mx-auto max-w-xs">
              <form>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}

              />
              <input
                className="w-full px-8 mt-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}

              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
              onClick={handleSubmit}
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none
                mb-4"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">
                  Sign Up
                </span>
              </button>
              <div className="px-4">Already have an account ?
                <Link href='/login'>
                <button className=" ml-5  text-blue-400">
                  Login
                </button>
                </Link>
              </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div> )}

    {pendingVerification && (
      <div className="flex items-center justify-center flex-col mt-5">
      <section className="max-w-2xl mx-auto bg-white">

        <div className="h-[200px] bg-[#365CCE] w-full text-white flex items-center justify-center flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-white"></div>
            <EmailIcon />
            <div className="w-10 h-[1px] bg-white"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center text-sm sm:text-xl tracking-widest font-normal">
              THANKS FOR SIGNING UP!
            </div>
            <div className="text-xl sm:text-3xl tracking-wider font-bold capitalize">
              Verify your E-mail Address
            </div>
          </div>
        </div>

        <main className="mt-8 px-5 sm:px-10">
          <h2 className="text-gray-700 ">{`Hello ${username}`}</h2>

          <p className="mt-2 leading-loose text-gray-600 ">
            Please use the following One Time Password(OTP)
          </p>

          <div className="flex  items-center mt-4 gap-x-4">
            <input className="flex items-center justify-center w-28 h-10 text-2xl font-medium text-[#365CCE] border border-[rgb(54,92,206)] rounded-md"
            type="text" pattern="/^-?\d+\.?\d*$/" maxlength="6"
            onChange={(e) => setCode(e.target.value)}
            />
              
          </div>

          <p className="mt-4 leading-loose text-gray-600">
            This passcode will only be valid for the next
            <span className="font-bold"> 2 minutes</span> . If the passcode does
            not work, you can use this login verification link:
          </p>

          <button
          onClick={onPressVerify}
           className="px-6 py-2 mt-6 text-sm font-bold tracking-wider text-white capitalize transition-colors duration-300 transform bg-orange-600 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-80">
            Verify email
          </button>

          <p className="mt-8 text-gray-600">
            Thank you, <br />
            Virtual Fitness
          </p>
        </main>
      </section>
    </div>
    )
    }
    </div>
  )
}

export default page