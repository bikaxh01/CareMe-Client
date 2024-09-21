"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { SignInFormSchema } from "@/config/zodModels";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
function SignInComponent() {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
  });
  const { toast } = useToast();
  const router = useRouter()
  async function onSubmit(data: z.infer<typeof SignInFormSchema>) {
    const res = await signIn("credentials", {
      redirect: false,
      type: "user",
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      toast({
        title: "ERROR",
        description:res.error,
        variant: "destructive",
      });
      
    } else {
      toast({
        title: "Success",
        description:"Signed In successfully"
      });
      router.push('/dashboard')
    }

    console.log("Form submitted");
  }
  return (
    <div className="h-screen md:flex">
      <div className="md:w-1/2 bg-white p-10">
        <h1 className="font-bold text-start">Company Name</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white mt-32"
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hi there, ....
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Get Started with Appointments.
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            <button
              type="submit"
              className="block bg-green-600 mt-4 py-2 px-4 rounded-2xl text-white font-semibold mb-2"
            >
              Submit
            </button>
          </form>
      <div>
       Not registered ? <Link href='/auth/sign-up' className=" text-blue-600 underline">Click Here</Link>
      </div>
        </Form>
      </div>
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-white to-blue-600 justify-around items-center hidden">
      </div>
    </div>
  );
}

export default SignInComponent;
