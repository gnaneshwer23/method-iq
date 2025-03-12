
import { ActivityFeed } from "./ActivityFeed";
import { AnalyticsSummary } from "./AnalyticsSummary";

export const DashboardSidebar = () => {
  return (
    <div className="space-y-4">
      <ActivityFeed />
      <AnalyticsSummary />
    </div>
  );
};
