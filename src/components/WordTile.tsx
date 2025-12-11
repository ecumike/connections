import { cn } from "@/lib/utils";

interface WordTileProps {
  word: string;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const WordTile = ({ word, isSelected, isDisabled, onClick }: WordTileProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        "h-16 sm:h-20 w-full rounded-lg font-semibold text-sm sm:text-base uppercase tracking-wide",
        "transition-all duration-200 ease-out",
        "border-2 border-transparent",
        isSelected
          ? "bg-tile-selected text-tile-selected-foreground scale-95 border-tile-selected-border"
          : "bg-tile text-tile-foreground hover:bg-tile-hover",
        isDisabled && "opacity-50 cursor-not-allowed",
        !isDisabled && !isSelected && "hover:scale-[0.98] active:scale-95"
      )}
    >
      {word}
    </button>
  );
};

export default WordTile;
