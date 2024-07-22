import { Link2, Plus } from "lucide-react";

// Components
import Button from "@base/components/Button";

// Types
import { IProps } from "./types/props";

const ImportantLinks: React.FC<IProps> = ({ links, onClickToAddLink }) => {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {links.map(({ id, title, url }) => (
          <div key={id} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{title}</span>
              <a
                href={url}
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                target="_blank"
              >
                {url}
              </a>
            </div>

            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full" onClick={onClickToAddLink}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
};

export default ImportantLinks;
