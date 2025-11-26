interface BudgetFilterProps {
  selected: number[];
  onChange: (selected: number[]) => void;
}

const budgetLevels = [
  { level: 1, label: "$", description: "Budget-friendly" },
  { level: 2, label: "$$", description: "Moderate" },
  { level: 3, label: "$$$", description: "Pricey" },
  { level: 4, label: "$$$$", description: "Luxury" },
];

export default function BudgetFilter({ selected, onChange }: BudgetFilterProps) {
  const toggleBudget = (level: number) => {
    if (selected.includes(level)) {
      onChange(selected.filter((l) => l !== level));
    } else {
      onChange([...selected, level]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Budget Range
      </label>
      <div className="flex flex-wrap gap-3">
        {budgetLevels.map((budget) => (
          <button
            key={budget.level}
            onClick={() => toggleBudget(budget.level)}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              selected.includes(budget.level)
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            }`}
          >
            <span className="font-semibold">{budget.label}</span>
            <span className="text-xs ml-2 opacity-75">{budget.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
