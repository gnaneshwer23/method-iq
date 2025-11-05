import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder, Text } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu } from 'lucide-react';

interface TwinVisualization3DProps {
  twin: any;
  metrics?: any[];
}

const TwinObject = ({ twinType, state }: { twinType: string; state: any }) => {
  const isActive = state?.active !== false;
  const temperature = state?.temperature || 25;
  
  // Color based on state
  const getColor = () => {
    if (!isActive) return '#6b7280'; // gray
    if (temperature > 40) return '#ef4444'; // red
    if (temperature > 30) return '#f59e0b'; // orange
    return '#10b981'; // green
  };

  if (twinType === 'equipment') {
    return (
      <group>
        <Box args={[2, 2, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial color={getColor()} metalness={0.5} roughness={0.2} />
        </Box>
        <Cylinder args={[0.5, 0.5, 1, 32]} position={[0, 1.5, 0]}>
          <meshStandardMaterial color={getColor()} metalness={0.5} roughness={0.2} />
        </Cylinder>
      </group>
    );
  }

  if (twinType === 'system') {
    return (
      <group>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color={getColor()} 
            metalness={0.8} 
            roughness={0.2} 
            wireframe={!isActive}
          />
        </Sphere>
        {/* Orbital rings */}
        {[0.8, 1.2, 1.6].map((radius, i) => (
          <group key={i} rotation={[Math.PI / 2, 0, i * Math.PI / 3]}>
            <mesh>
              <torusGeometry args={[radius, 0.02, 16, 100]} />
              <meshStandardMaterial color={getColor()} opacity={0.5} transparent />
            </mesh>
          </group>
        ))}
      </group>
    );
  }

  // Process type - interconnected cubes
  return (
    <group>
      {[-1.5, 0, 1.5].map((x, i) => (
        <Box key={i} args={[0.8, 0.8, 0.8]} position={[x, 0, 0]}>
          <meshStandardMaterial color={getColor()} metalness={0.3} roughness={0.5} />
        </Box>
      ))}
      <Cylinder args={[0.1, 0.1, 3, 16]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#3b82f6" />
      </Cylinder>
    </group>
  );
};

export const TwinVisualization3D = ({ twin, metrics }: TwinVisualization3DProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            3D Visualization
          </CardTitle>
          <Badge variant={twin?.is_active ? 'default' : 'secondary'}>
            {twin?.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#60a5fa" />
            
            {/* 3D Twin Object */}
            {twin && (
              <TwinObject twinType={twin.twin_type} state={twin.state || {}} />
            )}

            {/* State Labels */}
            {twin?.state && Object.keys(twin.state).length > 0 && (
              <Text
                position={[0, -2.5, 0]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {Object.entries(twin.state).slice(0, 2).map(([key, value]) => 
                  `${key}: ${value}`
                ).join(' | ')}
              </Text>
            )}

            {/* Controls */}
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              minDistance={3}
              maxDistance={15}
            />
          </Canvas>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span className="text-muted-foreground">Inactive</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
