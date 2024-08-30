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
  const [userEmail, setUserEmail] = useState('');
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
        setUserEmail(response.data.data.email)
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
      {
        signUpCompleted ? <VerificationForm email={userEmail} isUserCreated={signUpCompleted}/> :<SignUpForm sendData={handleSubmit} />
      }
      
    </div>
  );
}

export default SignUp;
