import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { isFavoriteFormation, toggleFavoriteFormation } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function FormationFavoriteButton({
  formationId,
  className,
}: {
  formationId: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isFavoriteFormation(formationId));
  }, [formationId]);

  return (
    <button
      type="button"
      onClick={() => {
        toggleFavoriteFormation(formationId);
        queueMicrotask(() => setOn(isFavoriteFormation(formationId)));
      }}
      className={cn(
        "tap-feedback inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shadow-sm",
        on && "border-primary bg-primary-soft text-primary",
        className,
      )}
      aria-label={on ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart className={cn("w-5 h-5", on && "fill-primary text-primary")} />
    </button>
  );
}
