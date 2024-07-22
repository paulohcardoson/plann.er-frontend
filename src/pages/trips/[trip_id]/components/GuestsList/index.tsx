import { CheckCircle2, CircleDashed, UserRoundPlus } from "lucide-react";
import Button from "@base/components/Button";
import { IProps } from "./types/props";

const GuestsList: React.FC<IProps> = ({
  participants,
  onClickToAddParticipant,
}) => (
  <div className="space-y-6">
    <h2 className="font-semibold text-xl">Convidados</h2>

    <div className="space-y-5">
      {participants.map((participant, index) => (
        <div
          key={participant.id}
          className="flex items-center justify-between gap-4"
        >
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              {participant.name ?? `Convidado ${index}`}
            </span>
            <span className="block text-sm text-zinc-400 truncate">
              {participant.email}
            </span>
          </div>

          {participant.is_confirmed ? (
            <CheckCircle2 className="text-green-400 size-5 shrink-0" />
          ) : (
            <CircleDashed className="text-zinc-400 size-5 shrink-0" />
          )}
        </div>
      ))}
    </div>

    <Button variant="secondary" size="full" onClick={onClickToAddParticipant}>
      <UserRoundPlus className="size-5" />
      Convidar
    </Button>
  </div>
);

export default GuestsList;
