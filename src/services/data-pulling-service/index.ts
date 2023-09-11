import { DATA_PULLING_INTERVAL } from '../../constants';
import { OpenChargeMapService } from './open-charge-map.service';

const openChargeMapService = new OpenChargeMapService();

const fetchData = async () => {
  try {
    const data = await openChargeMapService.fetchChargingStationData();
    console.log(data);

    // TODO: Process the data and update the database here
    // ...

    console.log('Data pulled and updated successfully.');
  } catch (error) {
    if (error instanceof Error) console.error(`'Error pulling data': ${error.message}`);
    else console.error('Error pulling data');
  }
};

setInterval(fetchData, DATA_PULLING_INTERVAL);

console.log('Data pulling scheduled to run every 5 minutes...');
