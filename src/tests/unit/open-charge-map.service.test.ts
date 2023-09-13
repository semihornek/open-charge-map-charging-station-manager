import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { OpenChargeMapService } from '../../services/data-pulling-service/open-charge-map.service';
import { mockChargingStationAxiosResponse } from '../mocks';

describe('OpenChargeMapService', () => {
  let openChargeMapService: OpenChargeMapService;
  let axiosMock: MockAdapter;

  beforeEach(() => {
    openChargeMapService = new OpenChargeMapService();
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('fetchChargingStationData should return charging station data', async () => {
    axiosMock.onGet().reply(200, [mockChargingStationAxiosResponse]);

    const chargingStations = await openChargeMapService.fetchChargingStationData();

    expect(chargingStations).toHaveLength(1);
    expect(chargingStations[0]._id).toBe('123');
    expect(chargingStations[0].operatorInfo.title).toBe('Operator');
    expect(chargingStations[0].statusType.title).toBe('Operational');
    expect(chargingStations[0].addressInfo.town).toBe('City');
    expect(chargingStations[0].connections[0].connectionType!.title).toBe('Type');
  });

  it('fetchChargingStationData should handle errors', async () => {
    axiosMock.onGet().reply(500, { error: 'Internal Server Error' });

    await expect(openChargeMapService.fetchChargingStationData()).rejects.toThrowError(
      'Failed to fetch charging station data',
    );
  });
});
