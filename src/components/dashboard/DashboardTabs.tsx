
import { Beaker, CircuitBoard, Laptop, ListChecks, Network } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsTab } from "./ProjectsTab";
import { ProtocolsTab } from "./ProtocolsTab";
import { DevicesTab } from "./DevicesTab";
import { SimulationsTab } from "./SimulationsTab";
import { FederatedTab } from "./FederatedTab";

export const DashboardTabs = () => {
  return (
    <Tabs defaultValue="projects" className="space-y-4">
      <TabsList className="grid grid-cols-5">
        <TabsTrigger value="projects" className="flex items-center gap-2">
          <Beaker className="h-4 w-4" />
          <span className="hidden sm:inline">Projects</span>
        </TabsTrigger>
        <TabsTrigger value="protocols" className="flex items-center gap-2">
          <ListChecks className="h-4 w-4" />
          <span className="hidden sm:inline">Protocols</span>
        </TabsTrigger>
        <TabsTrigger value="devices" className="flex items-center gap-2">
          <CircuitBoard className="h-4 w-4" />
          <span className="hidden sm:inline">Devices</span>
        </TabsTrigger>
        <TabsTrigger value="simulations" className="flex items-center gap-2">
          <Laptop className="h-4 w-4" />
          <span className="hidden sm:inline">Simulations</span>
        </TabsTrigger>
        <TabsTrigger value="federated" className="flex items-center gap-2">
          <Network className="h-4 w-4" />
          <span className="hidden sm:inline">Federated</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="projects">
        <ProjectsTab />
      </TabsContent>
      
      <TabsContent value="protocols">
        <ProtocolsTab />
      </TabsContent>
      
      <TabsContent value="devices">
        <DevicesTab />
      </TabsContent>
      
      <TabsContent value="simulations">
        <SimulationsTab />
      </TabsContent>
      
      <TabsContent value="federated">
        <FederatedTab />
      </TabsContent>
    </Tabs>
  );
};
