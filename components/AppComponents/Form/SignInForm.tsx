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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { SignInFormSchema } from "@/config/zodModels";
import { signIn } from "next-auth/react";
function SignInComponent() {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
  });

  async function onSubmit(data: z.infer<typeof SignInFormSchema>) {
    console.log(data);

    const res = await signIn("credentials", {
      redirect: false,
      type:'user',
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      console.error("Error:", res.error);
    } else {
      console.log(res);
      console.log("Signed in successfully");
    }

    console.log("Form submitted");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg mx-auto space-y-6 p-8  rounded-lg shadow-lg"
      >
        <div>
          <h1 className=" text-2xl">CareMe</h1>
        </div>
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
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SignInComponent;
