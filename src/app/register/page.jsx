"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../assets/logo-v2.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, LogIn } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'


export default function register() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [ShowPassword , setShowPassword] = useState(false)
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorServer , setErrorServer] = useState('')

  // check data after send
  const checkData = () => {
    let isValid = true;

    // check full name
    if (data.fullName === "") {
      setError((prev) => ({
        ...prev,
        fullName: "Full Name is required.",
      }));
      isValid = false;
    } else {
      setError((prev) => ({
        ...prev,
        fullName: "",
      }));
    }

    // check email
    if (data.email === "") {
      setError((prev) => ({
        ...prev,
        email: "Email is required.",
      }));
      isValid = false;
    } else if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    } else {
      setError((prev) => ({
        ...prev,
        email: "",
      }));
    }

    // check password
    if (data.password === "") {
      setError((prev) => ({
        ...prev,
        password: "Password is required.",
      }));
      isValid = false;
    } else if (data.password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long.",
      }));
      isValid = false;
    } else {
      setError({ ...error, password: "" });
    }

    // check confirm password
    if (data.confirmPassword === "") {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Confirm Password is required.",
      }));
      isValid = false;
    } else if (data.confirmPassword !== data.password) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      isValid = false;
    } else {
      setError((prev) => ({
        ...prev,
        confirmPassword: "",
      }));
    }

    return isValid;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkData();
    if (checkData()) {
      const formData = new FormData();
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      // send data to server
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
          {
            name: data.fullName,
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        console.log("sucessfully registered", response.data);

        // save token in local storage
        localStorage.setItem("authToken", response.data.token);
        
        toast({
          title: "Successfully registered",
          variant: "success"
        })

        // redirect to home page
        router.push(`register/onboarding`)
      } catch (e) {
        if (e.response) {
          console.error("Error:", e.response.data);
          toast({
            title: e.response.data.message,
            variant: "destructive",
          });
        } else {
          console.error("Network error or server is down");
          toast({
            title: "Network error",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-center container my-[30px]  relative z-[1000]">
        <Card className="py-10 px-4   md:px-16 w-full md:w-[460px] mb-10 relative overflow-hidden">
          <div className="flex justify-center flex-col items-center">
            <Image src={logo} className="w-[150px] " alt="logo" />
            <h2 className="text-center text-[30px] font-[700]">
              Sign Up Account
            </h2>
          </div>
          <form className="py-[10px] mb-[10px] flex flex-col gap-5 ">
            <div className="flex flex-col gap-2 relative">
              <Label>Full Name</Label>
              <Input
                type="text"
                id="fullName"
                placeholder="Full Name"
                onChange={(e) => {
                  setData({ ...data, fullName: e.target.value });
                }}
                className={error.fullName && "border-red-500"}
              />
              {error.fullName && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                  {error.fullName}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Email</Label>
              <Input
                type="text"
                placeholder="Entre your Email"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                className={error.email && "border-red-500"}
              />
              {error.email && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                  {error.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Password</Label>
              <Input
                type={ShowPassword ? 'text' : 'password'}
                placeholder="Entre your Password"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                className={error.password && "border-red-500"}
              />
              <Eye className="absolute right-[10px] w-5 h-5 top-[50%] cursor-pointer" onClick={() => setShowPassword(!ShowPassword)} />
              {error.password && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                  {error.password}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 relative">
              <Label>Confirm password</Label>
              <Input
                type="password"
                placeholder="Entre your Password"
                onChange={(e) => {
                  setData({ ...data, confirmPassword: e.target.value });
                }}
                className={error.confirmPassword && "border-red-500"}
              />
              
              {error.confirmPassword && (
                <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                  {error.confirmPassword}
                </p>
              )}
            </div>
            <Button
              className="mt-2 text-[16px]"
              onClick={(e) => handleSubmit(e)}
            >
              Sign Up
            </Button>
          </form>

          <div className="flex text-[14px] items-center gap-1 justify-center  absolute bottom-2 ">
            <span>Already Have a Account?</span> <LogIn className="w-5 h-5" />{" "}
            <Link className="font-[600]" href={"/"}>
              Log In
            </Link>
          </div>
          <div className="absolute bg-main-primary w-[50px] h-[300px] top-[-100px] rotate-45"></div>
        </Card>
      </div>
      <Image
        src={logo}
        className="w-[px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-[0.7] z-[100]  absolute "
        alt="logo"
      />
    </div>
  );
}
