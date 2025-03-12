
import { getDigitalTwin, updateDigitalTwin, updateSimulationStatus } from './twin-crud';
import type { SensorData } from '@/types/database.types';

/**
 * Run a simulation step or scenario
 * @param id - The ID of the digital twin to run simulation for
 * @param parameters - Optional parameters to use for the simulation
 */
export const runSimulation = async (id: string, parameters?: Record<string, any>) => {
  // First update status to in_progress
  const statusUpdate = await updateSimulationStatus(id, 'in_progress');
  
  if (statusUpdate.error) {
    return { data: null, error: statusUpdate.error };
  }
  
  // If parameters are provided, update the twin with them
  if (parameters && Object.keys(parameters).length > 0) {
    const paramUpdate = await updateDigitalTwin(id, {
      parameters: {
        ...statusUpdate.data?.[0]?.parameters,
        ...parameters,
        last_simulation_run: new Date().toISOString()
      }
    });
    
    if (paramUpdate.error) {
      return { data: null, error: paramUpdate.error };
    }
  }
  
  // In a real implementation, this would trigger actual simulation logic
  // For now, we'll just simulate a delay and mark it as completed
  // In a production environment, this would likely be a background job
  
  // Simulate a delay for the "simulation" to run
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Update status to completed
  const completionUpdate = await updateSimulationStatus(id, 'completed');
  
  return {
    data: completionUpdate.data?.[0] || null,
    error: completionUpdate.error
  };
};

/**
 * Update digital twin with sensor data
 * @param id - The ID of the digital twin
 * @param sensorData - The sensor data to incorporate
 */
export const updateWithSensorData = async (id: string, sensorData: SensorData[]) => {
  // First get the current twin
  const { data: twin, error } = await getDigitalTwin(id);
  
  if (error || !twin) {
    return { data: null, error: error || new Error('Digital twin not found') };
  }
  
  // Update the parameters with the sensor data
  // This is a simplified version - in a real implementation, 
  // this would process and integrate the data more intelligently
  const updatedParameters = {
    ...twin.parameters,
    latest_sensor_data: sensorData,
    last_sensor_update: new Date().toISOString()
  };
  
  // Update the twin
  const { data, error: updateError } = await updateDigitalTwin(id, {
    parameters: updatedParameters
  });
  
  return { data, error: updateError };
};
