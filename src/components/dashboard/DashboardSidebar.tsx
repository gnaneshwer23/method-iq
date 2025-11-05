
import { ActivityFeed } from "./ActivityFeed";
import { AnalyticsSummary } from "./AnalyticsSummary";
import { TasksList } from "./TasksList";
import { DigitalTwinsCard } from "./DigitalTwinsCard";

export const DashboardSidebar = () => {
  return (
    <div className="space-y-4">
      <TasksList />
      <DigitalTwinsCard />
      <ActivityFeed />
      <AnalyticsSummary />
    </div>
  );
};
