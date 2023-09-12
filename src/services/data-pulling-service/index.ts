import { DATA_PULLING_INTERVAL } from '../../constants';
import { DatabaseService } from './database.service';
import { OpenChargeMapService } from './open-charge-map.service';

const openChargeMapService = new OpenChargeMapService();
const databaseService = new DatabaseService();

const fetchData = async () => {
  try {
    const data = await openChargeMapService.fetchChargingStationData();

    await databaseService.saveChargingStationData(data);

    console.log('Data pulled and updated successfully.');
  } catch (error) {
    if (error instanceof Error) console.error(`Error pulling data: ${error.message}`);
    else console.error('Error pulling data');
  }
};

setInterval(fetchData, DATA_PULLING_INTERVAL / 10);

console.log('Data pulling scheduled to run every 5 minutes...');
