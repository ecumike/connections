import { cn } from "@/lib/utils";
import { Category } from "@/data/puzzles";

interface CategoryRevealProps {
  category: Category;
  index: number;
}

const CategoryReveal = ({ category, index }: CategoryRevealProps) => {
  const difficultyColors = {
    yellow: "bg-category-yellow text-category-yellow-foreground",
    green: "bg-category-green text-category-green-foreground",
    blue: "bg-category-blue text-category-blue-foreground",
    purple: "bg-category-purple text-category-purple-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-lg p-4 text-center animate-scale-in",
        difficultyColors[category.difficulty]
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="font-bold text-sm uppercase tracking-wider mb-1">
        {category.name}
      </h3>
      <p className="text-sm opacity-90">
        {category.words.join(", ")}
      </p>
    </div>
  );
};

export default CategoryReveal;
