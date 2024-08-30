"use client";
import React, { useState } from "react";
import { SignUpForm } from "@/components/AppComponents/Form/SignUpForm";
import { SignUpFormSchema } from "@/config/zodModels";
import { z } from "zod";
import { APIBaseUrl } from "@/config/EnvConfig";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import VerificationForm from "@/components/AppComponents/Form/verificationForm";

function SignUp() {
  const [formData, setFormData] = useState<any>();
  const [signUpCompleted, setSignUpCompleted] = useState(false);

  const { toast } = useToast();
  const handleSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
    submitForm(data);
    setFormData(data);
  };

  const submitForm = async (data: any) => {
    if (data) {
      console.log("🚀 ~ submitForm ~ data:", data);

      try {
        const response = await axios.post(
          `${APIBaseUrl}/user//auth/register-user`,
          data
        );
        toast({
          title: `${response.data.message}`,
          variant: "default",
        });
        setSignUpCompleted(true);
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
      <SignUpForm sendData={handleSubmit} />
    </div>
  );
}

export default SignUp;
