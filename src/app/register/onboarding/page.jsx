"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../../../assets/logo-v2.png";
import Image from "next/image";
import React, { useState } from "react";
import {
  ChefHat,
  ImageUp,
  MapPinHouse,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"

export default function restuarnt() {
  const { toast } = useToast()
  const [data, setData] = useState({
    name: "",
    phone: "",
    description: "",
    address: "",
    image: "",
  });
  const [error, setError] = useState({
    name: "",
    phone: "",
    description: "",
    address: "",
    image: "",
  });

  const checkData = () => {
    let isValid = true;
    if (!data.name) {
      isValid = false;
      setError((prev) => ({
        ...prev,
        name: "Restaurant Name is required",
      }));
    }

    if (!data.phone || !/^\d{10}$/.test(data.phone)) {
      isValid = false;
      setError((prev) => ({
        ...prev,
        phone: "Please enter a valid 10 digit phone number",
      }));
    }

    // check address
    if (!data.address) {
      isValid = false;
      setError((prev) => ({
       ...prev,
        address: "Address is required",
      }));
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkData();
    if(checkData()){
      // send data to server
       const formData = new FormData()
        formData.append("name", data.name);
        data.phone && formData.append("phone", data.phone);
        data.description && formData.append("description", data.description);
        data.address && formData.append("address", data.address);
        data.image && formData.append("image", data.image);

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/my-restaurant` ,
            formData
          ,{
            headers: {
               Authorization : 'Bearer ' + localStorage.getItem('authToken'),
            },
          }
        )
        console.log("sucessfully added restuarnt", response.data);

        toast({
          title: "Successfully added restuarnt",
          variant: "success"
        })

        }catch(e) {
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
  };
}

  return (
    <div>
      <div className="relative">
        <div className="flex justify-center container my-[30px]  relative z-[10]">
          <Card className="py-10 px-2  md:px-10 w-[800px] mb-10 relative overflow-hidden">
            <div className="flex justify-center flex-col items-center">
              <Image src={logo} className="w-[150px] " alt="logo" />
              <h2 className="text-center text-[30px] font-[700]">
              Business Information
              </h2>
            </div>
            <form className="py-[10px] mb-[10px] flex flex-col gap-5  ">
              <div className="grid md:grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 relative">
                    <Label>Business Name</Label>
                    <Input
                      type="text"
                      placeholder="Business Name"
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className={error.name && "border-red-500"}
                    />
                    {error.name && (
                      <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                        {error.name}
                      </p>
                    )}
                    <ChefHat className="absolute top-[50%] right-[4px] w-5 h-5 " />
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 relative">
                      <Label>Phone Number</Label>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className={error.phone && "border-red-500"}
                      />
                      {error.phone && (
                      <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                        {error.phone}
                      </p>
                    )}
                      <Phone className="absolute top-[50%] right-[4px] w-5 h-5 " />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Business Description</Label>
                      <textarea
                        type="text"
                        placeholder="Business Description"
                        className="h-[200px] focus:outline-none bg-[#F4F7F9] rounded-[12px] px-3 py-2 text-sm "
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2 relative">
                    <Label>Address</Label>
                    <Input
                      type="text"
                      placeholder="Address"
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className={error.address && "border-red-500"}
                    />
                    {error.address && (
                      <p className="text-[12px]  leading-[10px] absolute bottom-[-15px] text-red-500">
                        {error.address}
                      </p>
                    )}
                    <MapPinHouse className="absolute top-[50%] right-[4px] w-5 h-5 " />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Business Logo</Label>

                    <div className="flex items-center justify-center w-full ">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-55 border-2 rounded-[20px] border-dashed	 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageUp className="mb-3" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              image: e.target.files[0],
                            }))
                          }
                        />
                      </label>
                    </div>
                    {data.image && (
                      <div className="mt-5">
                        <Image
                          src={URL.createObjectURL(data.image)}
                          width={200}
                          height={200}
                          alt="Restaurant Logo"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button
                className="mt-2 text-[16px]"
                onClick={(e) => handleSubmit(e)}
              >
                Save Settings
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
