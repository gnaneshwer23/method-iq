
import { ActivityFeed } from "./ActivityFeed";
import { AnalyticsSummary } from "./AnalyticsSummary";
import { TasksList } from "./TasksList";

export const DashboardSidebar = () => {
  return (
    <div className="space-y-4">
      <TasksList />
      <ActivityFeed />
      <AnalyticsSummary />
    </div>
  );
};
