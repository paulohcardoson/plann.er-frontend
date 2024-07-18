import { CircleCheck } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { add, format } from "date-fns";
import { IProps } from "./types/props";

const Activities: React.FC<IProps> = ({ activities, starts_at }) => {
  return (
    <div className="space-y-8">
      {activities.map((activities, index) => {
        const date = add(starts_at, { days: index });

        return (
          <div key={index} className="space-y-2.5">
            <div className="flex gap-2 items-center">
              <span className="text-xl text-zinc-300 font-semibold">
                Dia {format(date, "d")}
              </span>
              <span className="text-xs text-zinc-500 mt-1">
                {format(date, "EEEE", { locale: ptBR })}
              </span>
            </div>

            {activities.length > 0 ? (
              <div>
                {activities.map((activity) => {
                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activity.occurs_at, "HH:mm")}h
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Activities;
