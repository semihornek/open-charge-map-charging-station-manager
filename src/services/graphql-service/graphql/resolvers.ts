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

    chargingStationsWithPagination: async (
      _: never,
      args: {
        first?: number;
        after?: number;
        last?: number;
        before?: number;
      },
    ) => {
      try {
        const { chargingStations, totalCount } =
          await databaseService.getChargingStationsWithPagination(args);

        // Get startCursor and endCursor if charging stations are available.
        const startCursor = chargingStations.length > 0 ? chargingStations[0].sequentialId : null;
        const endCursor =
          chargingStations.length > 0
            ? chargingStations[chargingStations.length - 1].sequentialId
            : null;

        // Calculate hasNextPage and hasPreviousPage based on the returned charging stations.
        let hasNextPage = false;
        if (endCursor) hasNextPage = totalCount > endCursor;

        let hasPreviousPage = false;
        if (startCursor) hasPreviousPage = startCursor > 1;

        return {
          chargingStations,
          totalCount: chargingStations.length,
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor,
        };
      } catch (error) {
        const errorMessage = 'Failed to fetch charging station data';
        if (error instanceof Error) throw new Error(`${errorMessage}: ${error.message}`);
        else throw new Error(errorMessage);
      }
    },
  },
};

export default resolvers;
