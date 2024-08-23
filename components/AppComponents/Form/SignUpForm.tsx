"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as React from "react";
import { City, Country, State } from "country-state-city";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
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
import { Input } from "@/components/ui/input";
import { SignUpFormSchema } from "@/config/zodModels";
import { useState } from "react";
import DropZone from "../dropZone";
import { ModeToggle } from "../ThemeToggler";

export function SignUpForm({sendData}:any) {

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
    sendData(data)
    console.log("Form submitted");
  }

  return (
    <Form {...form}>
      
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6 p-8  rounded-lg shadow-lg"
    >
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">Full Name</FormLabel>
            <FormControl>
              <Input
                placeholder="John Doe"
                {...field}
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </FormControl>
            <FormDescription className="text-sm text-gray-500">
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
  
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">Email</FormLabel>
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
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">Phone Number</FormLabel>
            <FormControl>
              <Input
                placeholder="98XXXXXXX"
                type="number"
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
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full">
            <FormLabel className="font-semibold text-gray-700">Date of Birth</FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full font-normal text-gray-700 border-gray-300",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      `${format(field.value, "PPP")}`
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white shadow-lg rounded-lg"
                align="start"
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={field.value}
                  onSelect={(selectedDate) => {
                    field.onChange(selectedDate);
                  }}
                  onDayClick={() => setIsOpen(false)}
                  fromYear={2000}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
            <FormDescription className="text-sm text-gray-500">
              Select your date of birth.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
  
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">Gender</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Select Your Gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
  
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">Country</FormLabel>
            <Select
              onValueChange={(value) => {
                setSelectedCountry(value);
                const countryName = Country.getCountryByCode(value)?.name;
                field.onChange(countryName);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Select Your Country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Country.getAllCountries().map((country) => (
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
  
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">State</FormLabel>
            <Select
              onValueChange={(value) => {
                setSelectedState(value);
                const stateName = State.getStateByCode(value)?.name;
                field.onChange(stateName);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Select Your State" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {State.getStatesOfCountry(selectedCountry).map((state) => (
                  <SelectItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
  
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">City</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Select Your City" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {City.getCitiesOfState(selectedCountry, selectedState).map(
                  (city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
  
      <DropZone />
  
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">Password</FormLabel>
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
  
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-semibold text-gray-700">Confirm Password</FormLabel>
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
