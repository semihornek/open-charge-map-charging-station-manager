import { DatabaseService } from '../database.service';
import { OpenChargeMapService } from './api';

export class DataFetcher {
  private openChargeMapService: OpenChargeMapService;
  private databaseService: DatabaseService;

  constructor(openChargeMapService: OpenChargeMapService, databaseService: DatabaseService) {
    this.openChargeMapService = openChargeMapService;
    this.databaseService = databaseService;
  }

  async fetchData(maxresults = 100) {
    try {
      const chargingStations = await this.openChargeMapService.fetchChargingStationData(maxresults);

      for (const chargingStation of chargingStations) {
        const isExistingStation = await this.databaseService.findIfChargingStationExists(
          chargingStation._id,
        );

        if (!isExistingStation) {
          await this.databaseService.saveChargingStationData(chargingStation);
        }
      }

      console.log('Data pulled from the API, and the DB updated successfully!');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error pulling data, and updating the DB: ${error.message}`);
      } else {
        console.error('Error pulling data, and updating the DB');
      }
    }
  }
}
