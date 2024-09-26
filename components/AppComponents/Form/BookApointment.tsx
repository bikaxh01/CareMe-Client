"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { BookAppointmentSchema } from "@/config/zodModels";
import { useToast } from "@/components/ui/use-toast";

import { format } from "date-fns";

import {
  Form,
  FormControl,
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
  const form = useForm<z.infer<typeof BookAppointmentSchema>>({
    resolver: zodResolver(BookAppointmentSchema),
  });

  const [date, setDate] = React.useState<Date>();


  function onSubmit(data: any) {
    console.log("🚀 ~ onSubmit ~ data:",data);
  }

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
                name="specialist"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Select Specialist</FormLabel>
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
                        <SelectItem value="specialist">
                          Anesthesiologists
                        </SelectItem>
                        <SelectItem value="specialist1">
                          Cardiologists
                        </SelectItem>
                        <SelectItem value="specialist2">
                          Dermatologists
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="selecDoctor"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Select Doctor</FormLabel>
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
                        <SelectItem value="doctor">
                          Burminda Burkumar
                        </SelectItem>
                        <SelectItem value="doctor2"> Ram lala </SelectItem>
                        <SelectItem value="doctor3"> Shib guiggar </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex ">
                <div className="mt-2">
                  <Popover>
                    <FormLabel
                      style={{ marginBottom: "10px", display: "block" }}
                    >
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
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Time</FormLabel>
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
                          <SelectItem value="Time1"> Night </SelectItem>
                          <SelectItem value="Time2">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <div>
                  <label
                    className="text-left"
                    htmlFor="story"
                    style={{ marginBottom: "10px", display: "block" }}
                  >
                    Description:{" "}
                  </label>
                </div>

                <textarea
                  style={{
                    borderColor: "dark",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 4,
                    padding: 10,
                    backgroundColor: "blue-",
                  }}
                  id="story"
                  name="story"
                  placeholder="write here ..."
                  rows={5}
                  cols={33}
                ></textarea>
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
