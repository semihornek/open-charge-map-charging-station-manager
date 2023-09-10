import { OpenChargeMapService } from './src/services';

const openChargeMapService = new OpenChargeMapService();

(async () => {
  const result = await openChargeMapService.fetchChargingStationData();
  console.log(result);
})();
