import React from "react";
import { Controller, useWatch } from "react-hook-form";

// Utils
import formatDateRange from "@base/utils/formatDateRange";

// Assets
import { User, X } from "lucide-react";

// Types
import { IConfirmTripModalProps } from "./types/props";

// Components
import Button from "@components/Button";
import Modal from "@components/Modal";

const ConfirmTripModal: React.FC<IConfirmTripModalProps> = ({
  control,
  isOpen,
  onClickToClose,
}) => {
  const [destination, date_range] = useWatch({
    control,
    name: ["destination", "date_range"],
  });

  return (
    <Modal isOpen={isOpen} onClickOnBlank={onClickToClose}>
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={onClickToClose} />
            </button>
          </div>

          <p className="text-left text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">{destination}</span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              {date_range && date_range.from && date_range.to
                ? formatDateRange({ from: date_range.from, to: date_range.to })
                : null}
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <div className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <Controller
              control={control}
              name="owner_name"
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  {...field}
                />
              )}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <Controller
              control={control}
              name="owner_email"
              render={({ field }) => (
                <input
                  type="email"
                  placeholder="Seu e-mail pessoal"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  {...field}
                />
              )}
            />
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmTripModal;
