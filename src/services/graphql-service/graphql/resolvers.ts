const resolvers = {
  Query: {
    chargingStations: async () => {
      try {
        // TODO: Fetch the charging stations from the db
        const chargingStations = null;
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
