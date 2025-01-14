import { Mail, X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Api
import api from "@shared/api";

// Components
import Modal from "@base/components/Modal";
import Button from "@base/components/Button";

// Types
import { IProps } from "./types/props";
import { IFormInputs, schema } from "./types/form";
import { toast } from "react-toastify";
import {
  ICreateTripParticipantRequest,
  TCreateTripParticipantResponse,
} from "@base/shared/api/requests/trips/participants/index.post";

const CreateParticipantModal: React.FC<IProps> = ({
  isOpen,
  onClickToClose,
  trip,
  participants,
  addParticipant,
}) => {
  const { register, handleSubmit, setError, reset } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const createParticipant = async (data: ICreateTripParticipantRequest) => {
    return await api.post<TCreateTripParticipantResponse>(
      `/trips/${trip.id}/invites`,
      data
    );
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const email = data.email.trim();

      if (participants.some((participant) => participant.email === email)) {
        return toast.warn("Este usuário já foi convidado");
      }

      await createParticipant({ email });

      addParticipant({
        email,
        id: email,
        name: null,
        is_confirmed: false,
      });

      reset();

      return toast.success(
        `Pessoa convidada com sucesso. Um email de confirmação para ${email} chegará em breve.`
      );
    } catch (error: any) {
      return toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClickOnBlank={onClickToClose}>
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Adicionar participantes</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={onClickToClose} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Convide mais pessoas para esta viagem.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              placeholder="Email"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              {...register("email")}
            />
          </div>

          <Button size="full">Convidar</Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateParticipantModal;
