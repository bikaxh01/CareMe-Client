return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <div className="mt-2">
          <Popover>
            <FormLabel className="text-left" style={{ marginBottom: "10px", display: "block" }}>
              Select Date for Checkup
            </FormLabel>

            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[250px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-1 h-4 w-4 gap-2" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date);
                  control.setValue("date", date); // Set the date in the form state
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && <FormMessage>{errors.date.message}</FormMessage>} {/* Display error message */}
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );

