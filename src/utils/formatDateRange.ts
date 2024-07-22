import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IDateRange {
  from: Date;
  to: Date;
}

const formatDateRange = ({ from, to }: IDateRange) => {
  const localeOptions = { locale: ptBR as never };

  if (from.getFullYear() !== to.getFullYear()) {
    const start = format(from, "d' de 'LLLL' de 'yyyy", localeOptions);
    const end = format(to, "d' de 'LLLL' de 'yyyy", localeOptions);

    return `${start} a ${end}`;
  }

  if (from.getMonth() !== to.getMonth()) {
    const start = format(from, "d' de 'LLLL'", localeOptions);
    const end = format(to, "d' de 'LLLL' de 'yyyy", localeOptions);

    return `${start} a ${end}`;
  }

  const start = format(from, "d", localeOptions);
  const end = format(to, "d' de 'LLLL' de 'yyyy", localeOptions);

  return `${start} a ${end}`;
};

export default formatDateRange;
