"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { APIBaseUrl } from "@/config/EnvConfig";

const FormSchema = z.object({
  verificationCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function VerificationForm({
  isUserCreated,
  email,
}: {
  isUserCreated: boolean;
  email: string;
}) {
  console.log("🚀 ~ VerificationForm ~ isUserCreated:", isUserCreated);
  const [isOpen, setIsOpen] = useState(isUserCreated);
  const [userEmail, setUserEmail] = useState(email);
  console.log("🚀 ~ VerificationForm ~ userEmail:", userEmail);
  console.log("🚀 ~ VerificationForm ~ email:", email);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verificationCode: "",
    },
  });
const router = useRouter()
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post(`${APIBaseUrl}/user/auth/verify-user`, {
        email: userEmail,
        verificationCode: data.verificationCode,
      });
      toast({
        title: "verified 🎉",
        description: response.data.message,
      });
      router.push('/dashboard')
    } catch (error:any) {
      const errorMessage = error.response.data.message;
      if (errorMessage) {
        toast({
          title: `${errorMessage}`,
          variant: "destructive",
        });
      }
     
    }

    setIsOpen(false); // Close the modal after submission
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Account</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      Please enter the one-time password sent to your phone.
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VerificationForm;
