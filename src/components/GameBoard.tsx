import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import WordTile from "./WordTile";
import CategoryReveal from "./CategoryReveal";
import MistakeTracker from "./MistakeTracker";
import { Category, Puzzle, shuffleArray } from "@/data/puzzles";
import { Shuffle, Send, X, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  puzzle: Puzzle;
  onNewGame: () => void;
}

const MAX_MISTAKES = 4;

const GameBoard = ({ puzzle, onNewGame }: GameBoardProps) => {
  const [words, setWords] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [solvedCategories, setSolvedCategories] = useState<Category[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const allWords = puzzle.categories.flatMap((c) => c.words);
    setWords(shuffleArray(allWords));
    setSelected([]);
    setSolvedCategories([]);
    setMistakes(0);
    setGameOver(false);
    setWon(false);
  }, [puzzle]);

  const handleWordClick = useCallback((word: string) => {
    if (gameOver) return;
    
    setSelected((prev) => {
      if (prev.includes(word)) {
        return prev.filter((w) => w !== word);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, word];
    });
  }, [gameOver]);

  const handleShuffle = () => {
    setWords((prev) => shuffleArray(prev));
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleSubmit = () => {
    if (selected.length !== 4) return;

    const matchedCategory = puzzle.categories.find(
      (category) =>
        !solvedCategories.includes(category) &&
        category.words.every((word) => selected.includes(word))
    );

    if (matchedCategory) {
      setSolvedCategories((prev) => [...prev, matchedCategory]);
      setWords((prev) => prev.filter((w) => !selected.includes(w)));
      setSelected([]);
      
      if (solvedCategories.length === 3) {
        setWon(true);
        setGameOver(true);
        toast.success("Congratulations! You solved the puzzle!");
      }
    } else {
      // Check for "one away"
      const almostCategory = puzzle.categories.find(
        (category) =>
          !solvedCategories.includes(category) &&
          category.words.filter((word) => selected.includes(word)).length === 3
      );
      
      if (almostCategory) {
        toast.info("One away...");
      }
      
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (newMistakes >= MAX_MISTAKES) {
        setGameOver(true);
        // Reveal remaining categories
        const remaining = puzzle.categories.filter(
          (c) => !solvedCategories.includes(c)
        );
        setSolvedCategories(puzzle.categories);
        setWords([]);
        toast.error("Game Over! Better luck next time.");
      }
    }
  };

  const remainingWords = words.filter(
    (w) => !solvedCategories.flatMap((c) => c.words).includes(w)
  );

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="text-center mb-6">
        <p className="text-muted-foreground text-sm">
          Create four groups of four!
        </p>
      </div>

      {/* Solved Categories */}
      <div className="space-y-2">
        {solvedCategories.map((category, index) => (
          <CategoryReveal key={category.name} category={category} index={index} />
        ))}
      </div>

      {/* Word Grid */}
      {remainingWords.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-4 gap-2 transition-transform",
            shake && "animate-shake"
          )}
        >
          {remainingWords.map((word) => (
            <WordTile
              key={word}
              word={word}
              isSelected={selected.includes(word)}
              isDisabled={gameOver}
              onClick={() => handleWordClick(word)}
            />
          ))}
        </div>
      )}

      {/* Mistake Tracker */}
      <div className="flex justify-center py-2">
        <MistakeTracker mistakes={mistakes} maxMistakes={MAX_MISTAKES} />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2 flex-wrap">
        {!gameOver ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShuffle}
              className="gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAll}
              disabled={selected.length === 0}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Deselect All
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSubmit}
              disabled={selected.length !== 4}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Submit
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={onNewGame}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            New Game
          </Button>
        )}
      </div>

      {/* Win/Lose Message */}
      {gameOver && (
        <div className="text-center py-4 animate-fade-in">
          <p className={cn(
            "text-lg font-semibold",
            won ? "text-category-green" : "text-destructive"
          )}>
            {won ? "🎉 You Won!" : "Game Over"}
          </p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
