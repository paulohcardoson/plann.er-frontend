import { X, AtSign, Plus } from "lucide-react";

// Components
import Button from "@base/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInputs, formSchema } from "./types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IInviteGuestsModalProps } from "./types/props";
import Modal from "@base/components/Modal";

const InviteGuestsModal: React.FC<IInviteGuestsModalProps> = ({
  isOpen,
  onClickToClose,
  addNewEmailToInvite,
  emailsToInvite,
  removeEmailFromInvites,
}) => {
  const { register, handleSubmit, reset } = useForm<IFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = ({ email }) => {
    try {
      addNewEmailToInvite(email);
      reset();
    } catch (err) {
      return;
    }
  };

  return (
    <Modal isOpen={isOpen} onClickOnBlank={onClickToClose}>
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">Selecionar convidados</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={onClickToClose} />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map(({ id, email }, index) => (
            <div
              key={id}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{email}</span>
              <button type="button">
                <X
                  onClick={() => removeEmailFromInvites(index)}
                  className="size-4 text-zinc-400"
                />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              placeholder="Digite o email do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              {...register("email")}
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default InviteGuestsModal;
