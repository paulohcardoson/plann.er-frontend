import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { validate as validateUUID } from "uuid";

// Components
import CreateActivityModal from "./modals/CreateActivity";
import ImportantLinks from "./components/ImportantLinks";
import GuestList from "./components/GuestsList";
import Activities from "./components/Activities";
import DestinationAndDateHeader from "./components/DestinationAndDateHeader";

// Types
import { IActivity } from "@base/types/IActivity";
import { ILink } from "@base/types/ILink";
import { ITrip } from "@base/types/ITrip";
import api from "@base/shared/api";
import { differenceInDays } from "date-fns";
import { IParticipant } from "@base/types/IParticipant";
import CreateLinkModal from "./modals/CreateLink";
import CreateParticipantModal from "./modals/CreateParticipant";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { IProps, TServerProps } from "./types/props";
import ApiError from "@base/shared/api/errors/ApiError";
import ErrorPage from "@base/components/ErrorPage";
import Head from "next/head";

const TripDetailsPage: React.FC<IProps> = ({ trip, ...data }) => {
  // Data
  const [participants, setParticipants] = useState(data.participants);
  const [links, setLinks] = useState(data.links);
  const [activities, setActivities] = useState<IActivity[][]>([]);

  // States
  const [isCreateActivityModalOpen, setCreateActivityModalState] =
    useState(false);
  const [isCreateLinkModalOpen, setCreateLinkModalState] = useState(false);
  const [isCreateParticipantModalOpen, setCreateParticipantModalState] =
    useState(false);

  useEffect(() => {
    const newActivities: IActivity[][] = [[]];

    const daysDifference = differenceInDays(
      new Date(trip.ends_at),
      new Date(trip.starts_at)
    );

    for (let i = 0; i <= daysDifference; i++) newActivities[i] = [];

    data.activities.forEach((activity) => {
      const index = differenceInDays(
        new Date(activity.occurs_at),
        new Date(trip.starts_at)
      );

      newActivities[index].push(activity);
    });

    setActivities(newActivities);
  }, [trip, data.activities]);

  const openCreateActivityModal = () => setCreateActivityModalState(true);
  const closeCreateActivityModal = () => setCreateActivityModalState(false);

  const openCreateLinkModal = () => setCreateLinkModalState(true);
  const closeCreateLinkModal = () => setCreateLinkModalState(false);

  const openCreateParticipantModal = () => setCreateParticipantModalState(true);
  const closeCreateParticipantModal = () =>
    setCreateParticipantModalState(false);

  const addParticipant = (participant: IParticipant) => {
    const newParticipants = [...participants, participant];

    setParticipants(newParticipants);
  };

  const addActivity = (activity: IActivity) => {
    const newActivities = activities;

    const index = differenceInDays(activity.occurs_at, trip!.starts_at);

    newActivities[index].push(activity);

    setActivities(newActivities);
  };

  const addLink = (link: ILink) => {
    const newLinks = [...links, link];

    setLinks(newLinks);
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <Head>
        <title>{`Planner - Viagem para ${trip.destination}`}</title>
      </Head>

      <DestinationAndDateHeader trip={trip!} />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button
              onClick={openCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activities
            activities={activities}
            starts_at={new Date(trip!.starts_at)}
          />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks
            links={links}
            onClickToAddLink={openCreateLinkModal}
          />

          <div className="w-full h-px bg-zinc-800" />

          <GuestList
            participants={participants}
            onClickToAddParticipant={openCreateParticipantModal}
          />
        </div>
      </main>

      <CreateActivityModal
        isOpen={isCreateActivityModalOpen}
        onClickToClose={closeCreateActivityModal}
        trip={trip!}
        addActivity={addActivity}
      />

      <CreateLinkModal
        isOpen={isCreateLinkModalOpen}
        onClickToClose={closeCreateLinkModal}
        trip={trip!}
        addLink={addLink}
      />

      <CreateParticipantModal
        isOpen={isCreateParticipantModalOpen}
        onClickToClose={closeCreateParticipantModal}
        trip={trip!}
        participants={participants}
        addParticipant={addParticipant}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TServerProps> = async (
  context
) => {
  const tripId = context.params!.trip_id as string;

  try {
    if (!validateUUID(tripId)) {
      throw new ApiError("UUID inválido", 400);
    }

    // Cache for 1 day
    context.res.setHeader(
      "Cache-Control",
      `public, s-maxage=${60 * 60 * 24}, stale-while-revalidate=${60 * 60 * 24}`
    );

    const trip = await api.get<ITrip>(`/trips/${tripId}`);
    const activities = await api.get<IActivity[]>(
      `/trips/${tripId}/activities`
    );
    const links = await api.get<ILink[]>(`/trips/${tripId}/links`);
    const participants = await api.get<IParticipant[]>(
      `/trips/${tripId}/participants`
    );

    return { props: { trip, activities, links, participants } };
  } catch (error) {
    return { props: { error: { ...(error as object) } } };
  }
};

export default TripDetailsPage;
