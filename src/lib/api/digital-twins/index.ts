
import { createDigitalTwin, getDigitalTwin, updateDigitalTwin, updateSimulationStatus, getProjectTwins } from './twin-crud';
import { runSimulation, updateWithSensorData } from './simulation';
import { subscribeToTwinUpdates, subscribeToSimulationUpdates, emitSimulationUpdate } from './realtime';

export const digitalTwinApi = {
  // Core CRUD operations
  createDigitalTwin,
  getDigitalTwin,
  updateDigitalTwin,
  updateSimulationStatus,
  getProjectTwins,
  
  // Simulation operations
  runSimulation,
  updateWithSensorData,
  
  // Realtime operations
  subscribeToTwinUpdates,
  subscribeToSimulationUpdates,
  emitSimulationUpdate
};
