"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function BookApointment() {
  const form = useForm();
  const onSubmit = () => {};

  const [date, setDate] = React.useState<Date>();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 border-2 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-6">
            Book Your Appointment Now,
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >
                      Select Specialist
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                          <SelectValue placeholder="Select Your Specialist" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Docter">
                          Anesthesiologists
                        </SelectItem>
                        <SelectItem value="Docter">Cardiologists</SelectItem>
                        <SelectItem value="Docter">Dermatologists</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel >
                      Select Doctor
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                          <SelectValue placeholder="Select Doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Doctor">
                          Burminda Burkumar
                        </SelectItem>
                        <SelectItem value="Doctor"> Ram lala </SelectItem>
                        <SelectItem value="Doctor"> Shib guiggar </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex ">
                <div className="mt-2">
                  <Popover>
                    <FormLabel  style={{ marginBottom: "10px", display: "block" }}>
                      Select Date for Checkup
                    </FormLabel>

                    <PopoverTrigger asChild>  
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[250px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-1 h-4 w-4 gap-2" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >
                        Select Time
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                            <SelectValue placeholder="Select Doctor" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Time"> Moring</SelectItem>
                          <SelectItem value="Time"> Night </SelectItem>
                          <SelectItem value="Time">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div >
                <div  >
                <label htmlFor="story" style={{ marginBottom: "10px", display: "block" }} >Description: </label>
                </div>
                
            
                <textarea
               
                style={{
                  borderColor: 'dark', 
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderRadius: 4,
                  padding: 10,
                  backgroundColor: 'blue-',
                }}
                
                  id="story"
                  name="story"
                  placeholder="write here ..."
                  rows={5}
                  cols={33}
                >
                   
                </textarea>
               
                </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="block bg-green-600 mt-4 py-2 px-4 rounded-2xl text-white font-semibold mb-2"
                >
                  Book Now
                </button>
              </div>
            </form>
          </Form>
        </div>
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-white to-blue-600 justify-around items-center hidden"></div>
      </div>
    </div>
  );
}

export default BookApointment;
