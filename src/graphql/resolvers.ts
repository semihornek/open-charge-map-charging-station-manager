import { OpenChargeMapService } from '../services';

const openChargeMapService = new OpenChargeMapService(); // Instantiate the service

const resolvers = {
  Query: {
    chargingStations: async () => {
      try {
        const chargingStations = await openChargeMapService.fetchChargingStationData();
        return chargingStations;
      } catch (error) {
        const errorMessage = 'Failed to fetch charging station data';
        if (error instanceof Error) throw new Error(`${errorMessage}: ${error.message}`);
        else throw new Error(errorMessage);
      }
    },
  },
};

export default resolvers;
