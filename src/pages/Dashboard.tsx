
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background/95 to-background">
      <Header />
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Welcome, {user?.email}</h2>
              <p className="text-muted-foreground">Manage your research and experiments</p>
            </div>
            <Button onClick={() => navigate('/new-project')}>New Project</Button>
          </div>
          
          <Tabs defaultValue="projects">
            <TabsList className="grid w-full md:w-auto grid-cols-5 mb-4">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="protocols">Protocols</TabsTrigger>
              <TabsTrigger value="devices">IoT Devices</TabsTrigger>
              <TabsTrigger value="simulations">Simulations</TabsTrigger>
              <TabsTrigger value="federated">Federated Learning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>No Projects Yet</CardTitle>
                    <CardDescription>Create your first research project to get started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/new-project')}>Create Project</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="protocols">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>No Protocols Yet</CardTitle>
                    <CardDescription>Use the AI Protocol Engine to generate recommended protocols</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/ai-protocols')}>Generate Protocol</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="devices">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>No IoT Devices</CardTitle>
                    <CardDescription>Connect lab equipment and sensors to your projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/iot-devices')}>Connect Device</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="simulations">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>No Digital Twins</CardTitle>
                    <CardDescription>Create digital representations of your experiments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/digital-twins')}>Create Digital Twin</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="federated">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>No Federated Learning Projects</CardTitle>
                    <CardDescription>Participate in collaborative model training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/federated-learning')}>Join Project</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
