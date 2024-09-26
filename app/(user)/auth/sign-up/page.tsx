"use client";
import React, { useState } from "react";
import { SignUpForm } from "@/components/AppComponents/Form/SignUpForm";
import { SignUpFormSchema } from "@/config/zodModels";
import { z } from "zod";
import { APIBaseUrl } from "@/config/EnvConfig";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import VerificationForm from "@/components/AppComponents/Form/verificationForm";
import { useRouter } from "next/navigation";

function SignUp() {
  const { toast } = useToast();

  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof SignUpFormSchema>) => {
    if (data) {
      try {
        const response = await axios.post(
          `${APIBaseUrl}/user/auth/register-user`,
          data
        );
        toast({
          title: `${response.data.message}`,
          variant: "default",
        });
        router.push(`/verify-user?email=${response.data.data.email}`);
      } catch (error) {
        //@ts-ignore
        console.log(error.status);
        //@ts-ignore
        const errorMessage = error.response.data.message;
        if (errorMessage) {
          toast({
            title: `${errorMessage}`,
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div>
      <SignUpForm handleSubmit={handleSubmit} />
    </div>
  );
}

export default SignUp;
