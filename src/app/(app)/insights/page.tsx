import { AiSuggestions } from '@/components/insights/ai-suggestions';

export default function InsightsPage() {
  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">AI Insights</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Get personalized suggestions to improve your finances.
        </p>
      </div>
      <AiSuggestions />
    </div>
  );
}
