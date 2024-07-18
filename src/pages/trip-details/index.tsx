import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

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
import { useParams } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { IParticipant } from "@base/types/IParticipant";
import CreateLinkModal from "./modals/CreateLink";
import CreateParticipantModal from "./modals/CreateParticipant";

const TripDetailsPage: React.FC = () => {
  const { tripId } = useParams();

  // Data
  const [trip, setTrip] = useState<ITrip>();
  const [participants, setParticipants] = useState<IParticipant[]>();
  const [links, setLinks] = useState<ILink[]>();
  const [activities, setActivities] = useState<IActivity[][]>([]);

  const [isCreateActivityModalOpen, setCreateActivityModalState] =
    useState(false);
  const [isCreateLinkModalOpen, setCreateLinkModalState] = useState(false);
  const [isCreateParticipantModalOpen, setCreateParticipantModalState] =
    useState(false);

  useEffect(() => {
    api
      .get<ITrip>(`/trips/${tripId}`)
      .then((response) => response.data)
      .then(async (trip) => {
        setTrip(trip);

        // Setting activities here, since it needs trip information
        const newActivities: IActivity[][] = [];

        const daysDifference = differenceInDays(
          new Date(trip.ends_at),
          new Date(trip.starts_at)
        );

        for (let i = 0; i <= daysDifference; i++) newActivities[i] = [];

        api
          .get<IActivity[]>(`trips/${tripId}/activities`)
          .then((response) => response.data)
          .then((activities) => {
            activities.forEach((activity) => {
              const index = differenceInDays(
                new Date(activity.occurs_at),
                new Date(trip.starts_at)
              );

              newActivities[index].push(activity);
            });

            setActivities(newActivities);
          });
      });
    api
      .get<ILink[]>(`/trips/${tripId}/links`)
      .then((response) => response.data)
      .then(setLinks);
    api
      .get<IParticipant[]>(`/trips/${tripId}/participants`)
      .then((response) => response.data)
      .then(setParticipants);
  }, [tripId]);

  const openCreateActivityModal = () => setCreateActivityModalState(true);
  const closeCreateActivityModal = () => setCreateActivityModalState(false);

  const openCreateLinkModal = () => setCreateLinkModalState(true);
  const closeCreateLinkModal = () => setCreateLinkModalState(false);

  const openCreateParticipantModal = () => setCreateParticipantModalState(true);
  const closeCreateParticipantModal = () =>
    setCreateParticipantModalState(false);

  if (!trip || !participants || !links || !activities) {
    return <span>Loading</span>;
  }

  const addParticipant = (participant: IParticipant) => {
    const newParticipants = [...participants, participant];

    setParticipants(newParticipants);
  };
  const addActivity = (activity: IActivity) => {
    const newActivities = activities;

    const index = differenceInDays(activity.occurs_at, trip.starts_at);

    newActivities[index].push(activity);

    setActivities(newActivities);
  };
  const addLink = (link: ILink) => {
    const newLinks = [...links, link];

    setLinks(newLinks);
  };

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader trip={trip} />

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
            starts_at={new Date(trip.starts_at)}
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
        trip={trip}
        addActivity={addActivity}
      />

      <CreateLinkModal
        isOpen={isCreateLinkModalOpen}
        onClickToClose={closeCreateLinkModal}
        trip={trip}
        addLink={addLink}
      />

      <CreateParticipantModal
        isOpen={isCreateParticipantModalOpen}
        onClickToClose={closeCreateParticipantModal}
        trip={trip}
        participants={participants}
        addParticipant={addParticipant}
      />
    </div>
  );
};

export default TripDetailsPage;
