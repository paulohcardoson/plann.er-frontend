import React, { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";

// Assets
import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";

// Utils
import formatDateRange from "@base/utils/formatDateRange";

// Styles
import "react-day-picker/dist/style.css";

// Components
import Button from "@base/components/Button";

// Types
import { IDestinationAndDateStepProps } from "./types/props";
import { Controller, useWatch } from "react-hook-form";
import Modal from "@base/components/Modal";

const DestinationAndDateStep: React.FC<IDestinationAndDateStepProps> = ({
  control,
  isGuestsInputOpen,
  onClickToOpenGuestsInput,
  onClickToCloseGuestsInput,
}) => {
  const dateRange = useWatch({
    control,
    name: "date_range",
  });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = () => setIsDatePickerOpen(true);
  const closeDatePicker = () => setIsDatePickerOpen(false);

  const displayedDate =
    dateRange.from && dateRange.to
      ? formatDateRange({ from: dateRange.from, to: dateRange.to })
      : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <Controller
          control={control}
          name="destination"
          render={({ field }) => (
            <input
              disabled={isGuestsInputOpen}
              type="text"
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              {...field}
            />
          )}
        />
      </div>

      <button
        disabled={isGuestsInputOpen}
        onClick={openDatePicker}
        className="flex items-center gap-2 text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando"}
        </span>
      </button>

      <Modal
        isOpen={isDatePickerOpen}
        onClickOnBlank={() => setIsDatePickerOpen(false)}
      >
        <div className="rounded-xl py-8 px-6 shadow-shape bg-zinc-900">
          <div className="px-6 pt-2.5 pb-8">
            <div className="flex items-center justify-between">
              <h2 className="font-lg font-semibold">Selecione a data</h2>
              <button>
                <X className="size-5 text-zinc-400" onClick={closeDatePicker} />
              </button>
            </div>
          </div>

          <Controller
            control={control}
            name="date_range"
            render={({ field }) => {
              const onChange = (range?: DateRange) =>
                field.onChange({
                  target: {
                    value: { from: range?.from, to: range?.to } as DateRange,
                  },
                });

              return (
                <DayPicker
                  mode="range"
                  selected={field.value}
                  onSelect={onChange}
                  modifiersStyles={{
                    selected: {
                      backgroundColor: "rgb(163 230 53 / 0.75)",
                    },
                  }}
                />
              );
            }}
          ></Controller>
        </div>
      </Modal>

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={onClickToCloseGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={onClickToOpenGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
};

export default DestinationAndDateStep;
