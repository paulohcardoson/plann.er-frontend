import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import InviteGuestsModal from "./modals/InviteGuests";
import ConfirmTripModal from "./modals/ConfirmTrip";
import DestinationAndDateStep from "./steps/DestinationAndDate";
import InviteGuestsStep from "./steps/InviteGuests";

import { IFormInputs, formSchema } from "./types/form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ICreateTripRequest } from "@base/shared/api/requests/trips/index.post";
import api from "@base/shared/api";

const CreateTripPage: React.FC = () => {
  // Hook Form
  const { control, handleSubmit } = useForm<IFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      date_range: { from: undefined, to: undefined },
      owner_name: "",
      owner_email: "",
      emails_to_invite: [],
    },
  });
  const {
    fields: emailsToInvite,
    append,
    remove,
  } = useFieldArray({
    control: control,
    name: "emails_to_invite",
  });

  // Navigate
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const openGuestsInput = () => setIsGuestsInputOpen(true);
  const closeGuestsInput = () => setIsGuestsInputOpen(false);

  const openGuestsModal = () => setIsGuestsModalOpen(true);
  const closeGuestsModal = () => setIsGuestsModalOpen(false);

  const openConfirmTripModal = () => setIsConfirmTripModalOpen(true);
  const closeConfirmTripModal = () => setIsConfirmTripModalOpen(false);

  const addNewEmailToInvite = (email: string) => {
    const alreadyExistingEmail = emailsToInvite.find((_) => _.email === email);

    if (alreadyExistingEmail) throw new Error();

    append({ email });
  };
  const removeEmailFromInvites = (index: number) => remove(index);

  const createTrip: SubmitHandler<IFormInputs> = async (data) => {
    const { destination, date_range, owner_email, owner_name } = data;

    if (!date_range.from || !date_range.to) return;

    const requestBody: ICreateTripRequest = {
      destination,
      starts_at: date_range.from.toISOString(),
      ends_at: date_range.to.toISOString(),
      owner: {
        name: owner_name,
        email: owner_email,
      },
      emails_to_invite: emailsToInvite.map(({ email }) => email),
    };

    const response = await api.post("/trips", requestBody);

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <form
        className="max-w-3xl w-full px-6 text-center space-y-10"
        onSubmit={handleSubmit(createTrip)}
      >
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            control={control}
            isGuestsInputOpen={isGuestsInputOpen}
            onClickToCloseGuestsInput={closeGuestsInput}
            onClickToOpenGuestsInput={openGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite.map(({ email }) => email)}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>

        <ConfirmTripModal
          control={control}
          isOpen={isConfirmTripModalOpen}
          onClickToClose={closeConfirmTripModal}
        />
      </form>

      <InviteGuestsModal
        isOpen={isGuestsModalOpen}
        onClickToClose={closeGuestsModal}
        emailsToInvite={emailsToInvite}
        addNewEmailToInvite={addNewEmailToInvite}
        removeEmailFromInvites={removeEmailFromInvites}
      />
    </div>
  );
};

export default CreateTripPage;
