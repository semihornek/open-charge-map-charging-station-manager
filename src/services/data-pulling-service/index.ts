import { DATA_PULLING_INTERVAL } from '../../constants';
import { DatabaseService } from '../database.service';
import { OpenChargeMapService } from './open-charge-map.service';

const openChargeMapService = new OpenChargeMapService();
const databaseService = DatabaseService.getInstance();

const fetchData = async () => {
  try {
    const chargingStations = await openChargeMapService.fetchChargingStationData();

    for (const chargingStation of chargingStations) {
      const isExistingStation = await databaseService.findIfChargingStationExists(
        chargingStation._id,
      );
      !isExistingStation && (await databaseService.saveChargingStationData(chargingStation));
    }

    console.log('Data pulled from the API, and the DB updated successfully!');
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error pulling data, and updating the DB: ${error.message}`);
    else console.error('Error pulling data, and updating the DB');
  }
};

setInterval(fetchData, DATA_PULLING_INTERVAL / 20);

console.log('Data pulling scheduled to run every 5 minutes...');
