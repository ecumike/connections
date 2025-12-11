import { useState } from "react";
import GameBoard from "@/components/GameBoard";
import { puzzles } from "@/data/puzzles";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  const handleNewGame = () => {
    setGameKey((prev) => prev + 1);
  };

  const handleNextPuzzle = () => {
    setCurrentPuzzleIndex((prev) => (prev + 1) % puzzles.length);
    setGameKey((prev) => prev + 1);
  };

  const handlePrevPuzzle = () => {
    setCurrentPuzzleIndex((prev) => (prev - 1 + puzzles.length) % puzzles.length);
    setGameKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Connections
          </h1>
          <p className="text-muted-foreground text-sm">
            Group the 16 words into 4 categories
          </p>
        </header>

        {/* Puzzle Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevPuzzle}
            aria-label="Previous puzzle"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextPuzzle}
            aria-label="Next puzzle"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Game Board */}
        <GameBoard
          key={gameKey}
          puzzle={puzzles[currentPuzzleIndex]}
          onNewGame={handleNewGame}
        />

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-sm bg-category-yellow" />
            <span>Easy</span>
            <span className="w-3 h-3 rounded-sm bg-category-green ml-2" />
            <span>Medium</span>
            <span className="w-3 h-3 rounded-sm bg-category-blue ml-2" />
            <span>Hard</span>
            <span className="w-3 h-3 rounded-sm bg-category-purple ml-2" />
            <span>Tricky</span>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Index;
