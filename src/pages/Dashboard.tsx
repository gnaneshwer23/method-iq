import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Beaker, 
  BrainCircuit, 
  CalendarClock, 
  CircuitBoard, 
  FlaskConical, 
  Laptop, 
  LineChart, 
  ListChecks, 
  Network, 
  Plus, 
  RefreshCcw, 
  Share2, 
  Sparkles, 
  Users 
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <RefreshCcw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  const recentActivity = [
    { id: 1, type: 'Updated', item: 'PCR Protocol', date: '2 hours ago' },
    { id: 2, type: 'Created', item: 'New Experiment', date: 'Yesterday' },
    { id: 3, type: 'Connected', item: 'IoT Temperature Sensor', date: '3 days ago' },
  ];

  const researchStats = [
    { title: 'Active Projects', value: '5', icon: <Beaker className="h-8 w-8 text-blue-500" /> },
    { title: 'Running Experiments', value: '3', icon: <FlaskConical className="h-8 w-8 text-green-500" /> },
    { title: 'Connected Devices', value: '7', icon: <CircuitBoard className="h-8 w-8 text-amber-500" /> },
    { title: 'Team Members', value: '12', icon: <Users className="h-8 w-8 text-purple-500" /> },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background">
      <Header />
      <main className="flex-1 container py-6">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate('/new-project')} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
              <Button variant="outline" onClick={() => navigate('/team')}>
                <Users className="h-4 w-4 mr-2" />
                Manage Team
              </Button>
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {researchStats.map((stat, index) => (
            <Card key={index} className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Main content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left column */}
          <div className="md:col-span-2">
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
              
              <TabsContent value="projects" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Research Projects</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Project
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                            <Beaker className="h-4 w-4 text-blue-600" />
                          </div>
                          <CardTitle className="text-lg">Gene Expression Study</CardTitle>
                        </div>
                        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Active</span>
                      </div>
                      <CardDescription>Analyzing differential expression in cancer cells</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex justify-between w-full text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          Updated 2 days ago
                        </span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          5 members
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border-dashed border-2 flex items-center justify-center p-6 hover:border-primary/70 transition-colors cursor-pointer" onClick={() => navigate('/new-project')}>
                    <div className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">Create New Project</h3>
                      <p className="text-sm text-muted-foreground">Start a new research initiative</p>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="protocols">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                        AI Protocol Suggestions
                      CardTitle>
                      <CardDescription>Get protocols tailored to your research</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => navigate('/ai-protocols')}>
                        Generate Protocol
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="devices">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connect IoT Devices</CardTitle>
                      <CardDescription>Link lab equipment to your digital workspace</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => navigate('/iot-devices')}>
                        Connect Device
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="simulations">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Digital Twins</CardTitle>
                      <CardDescription>Create virtual representations of experiments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => navigate('/digital-twins')}>
                        Create Digital Twin
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="federated">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BrainCircuit className="h-5 w-5 mr-2 text-purple-500" />
                        Federated Learning
                      </CardTitle>
                      <CardDescription>Collaborate on AI models while preserving data privacy</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => navigate('/federated-learning')}>
                        Join Project
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column */}
          <div className="space-y-4">
            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                        {item.type === 'Updated' && <RefreshCcw className="h-4 w-4 text-blue-500" />}
                        {item.type === 'Created' && <Plus className="h-4 w-4 text-green-500" />}
                        {item.type === 'Connected' && <Share2 className="h-4 w-4 text-orange-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.type} <span className="text-primary">{item.item}</span></p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-sm">View All Activity</Button>
              </CardFooter>
            </Card>
            
            {/* Analytics Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-500" />
                  Research Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-slate-50 rounded-md mb-4">
                  <p className="text-sm text-muted-foreground">Analytics visualization will appear here</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Total Data Points</p>
                    <p className="font-semibold">16.4k</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Processing Time</p>
                    <p className="font-semibold">12.3 hrs</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-sm">Full Analytics</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
