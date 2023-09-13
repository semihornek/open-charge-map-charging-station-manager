import { DatabaseService } from '../../database.service';

const databaseService = DatabaseService.getInstance();
const resolvers = {
  Query: {
    chargingStations: async () => {
      try {
        const chargingStations = await databaseService.getChargingStations();
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
