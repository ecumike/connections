import { cn } from "@/lib/utils";

interface MistakeTrackerProps {
  mistakes: number;
  maxMistakes: number;
}

const MistakeTracker = ({ mistakes, maxMistakes }: MistakeTrackerProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground font-medium">Mistakes remaining:</span>
      <div className="flex gap-1">
        {Array.from({ length: maxMistakes }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              i < maxMistakes - mistakes
                ? "bg-mistake-dot"
                : "bg-mistake-dot-empty scale-75"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default MistakeTracker;
