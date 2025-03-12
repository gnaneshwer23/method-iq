
import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const NotificationsButton = () => {
  const [hasUnread, setHasUnread] = useState(true);
  
  const notifications = [
    { id: 1, title: "Experiment completed", time: "2 hours ago", read: false },
    { id: 2, title: "New team member added", time: "Yesterday", read: false },
    { id: 3, title: "Protocol updated", time: "3 days ago", read: true },
  ];

  const markAllAsRead = () => {
    setHasUnread(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasUnread && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-semibold">Notifications</h4>
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
        <div className="max-h-80 overflow-auto">
          {notifications.length > 0 ? (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-2 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer",
                    !notification.read && "bg-muted/30"
                  )}
                >
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No new notifications
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
