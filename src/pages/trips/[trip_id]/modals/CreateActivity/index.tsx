import { Calendar, Tag, X } from "lucide-react";
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
import { IActivity } from "@base/types/IActivity";
import {
  ICreateTripActivityRequest,
  ICreateTripActivityResponse,
} from "@base/shared/api/requests/trips/activities/index.post";
import { title } from "process";
import { toast } from "react-toastify";
import ApiError from "@base/shared/api/errors/ApiError";

const CreateActivityModal: React.FC<IProps> = ({
  isOpen,
  onClickToClose,
  trip,
  addActivity,
}) => {
  const { register, handleSubmit, reset } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const createActivity = async (data: ICreateTripActivityRequest) => {
    return await api.post<ICreateTripActivityResponse>(
      `/trips/${trip.id}/activities`,
      data
    );
  };

  const onSubmit: SubmitHandler<IFormInputs> = async ({ title, occurs_at }) => {
    try {
      const activity = await createActivity({
        title: title,
        occurs_at: occurs_at.toISOString(),
      });

      addActivity({
        id: activity.activityId,
        title: title,
        occurs_at: occurs_at.toISOString(),
      });

      reset();

      return toast.success("Atividade adicionada com sucesso.");
    } catch (error: any) {
      return toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClickOnBlank={onClickToClose}>
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Cadastrar atividade</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={onClickToClose} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              {...register("title")}
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              {...register("occurs_at")}
            />
          </div>

          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateActivityModal;
