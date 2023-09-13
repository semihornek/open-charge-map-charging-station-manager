import { DATA_PULLING_INTERVAL } from '../../constants';
import { DatabaseService } from '../database.service';
import { OpenChargeMapService } from './open-charge-map.service';

export class DataFetcher {
  private openChargeMapService: OpenChargeMapService;
  private databaseService: DatabaseService;

  constructor(openChargeMapService: OpenChargeMapService, databaseService: DatabaseService) {
    this.openChargeMapService = openChargeMapService;
    this.databaseService = databaseService;
  }

  async fetchData() {
    try {
      const chargingStations = await this.openChargeMapService.fetchChargingStationData();

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

  startDataFetching() {
    setInterval(() => this.fetchData(), DATA_PULLING_INTERVAL);
    console.log('Data pulling scheduled to run every 5 minutes...');
  }
}

const dataFetcher = new DataFetcher(new OpenChargeMapService(), DatabaseService.getInstance());
dataFetcher.startDataFetching();
