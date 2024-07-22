import { MapPin, Calendar, Settings2 } from "lucide-react";
import { format } from "date-fns";

// Components
import Button from "@base/components/Button";

// Types
import { IProps } from "./types/props";

const DestinationAndDateHeader: React.FC<IProps> = ({ trip }) => {
  const displayedDate = format(trip.starts_at, "d' de 'LLL")
    .concat(" até ")
    .concat(format(trip.ends_at, "d' de 'LLL"));

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button
          variant="secondary"
          onClick={() => {
            alert("Essa função nunca sequer existiu. De onde tiraram isso?");
          }}
        >
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default DestinationAndDateHeader;
