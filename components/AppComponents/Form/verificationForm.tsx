"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { APIBaseUrl } from "@/config/EnvConfig";

const FormSchema = z.object({
  verificationCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function VerificationForm() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verificationCode: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams()
 const email =  searchParams.get('email')
  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post(`${APIBaseUrl}/user/auth/verify-user`, {
         email,
        verificationCode: data.verificationCode,
      });
      toast({
        title: "verified 🎉",
        description: response.data.message,
      });
      router.push("auth/sign-in");
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      if (errorMessage) {
        toast({
          title: `${errorMessage}`,
          variant: "destructive",
        });
      }
    }
   
  }

  return (
    <>
      <div
        className="  justify-center items-center  bg-cover bg-center  bg-opacity-80"
        style={{
          backgroundImage: `url('https://t3.ftcdn.net/jpg/03/09/78/04/360_F_309780437_bztYRNRTMDZYw3tYMSvxY3taQcE7mJqE.jpg')`,
        }}
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-md p-8 border-2 space-y-25 bg-slate-50 rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight lg:text-1xl mb-4">
                Get Started With CareMe
              </h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription>
                          Please enter the one-time password sent to your Email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-white to-blue-600 justify-around items-center hidden"></div>
      </div>
    </>
  );
}

export default VerificationForm;
