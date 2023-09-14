import { DataFetcher } from '../../services/data-pulling-service/fetch-data.service';
import { mockChargingStationData } from '../mocks';

interface OpenChargeMapServiceMock {
  fetchChargingStationData: jest.Mock;
}

interface DatabaseServiceMock {
  getInstance: jest.Mock;
  findIfChargingStationExists: jest.Mock;
  saveChargingStationData: jest.Mock;
}

const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('DataFetcher', () => {
  let openChargeMapServiceMock: OpenChargeMapServiceMock;
  let databaseServiceMock: DatabaseServiceMock;
  let dataFetcher: DataFetcher;

  beforeAll(async () => {
    openChargeMapServiceMock = {
      fetchChargingStationData: jest.fn().mockReturnValue([mockChargingStationData]),
    };

    databaseServiceMock = {
      getInstance: jest.fn(),
      findIfChargingStationExists: jest.fn().mockReturnValue(false),
      saveChargingStationData: jest.fn(),
    };

    dataFetcher = new DataFetcher(openChargeMapServiceMock, databaseServiceMock as never);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch charging station data and update the database', async () => {
    openChargeMapServiceMock.fetchChargingStationData.mockResolvedValue([mockChargingStationData]);
    databaseServiceMock.findIfChargingStationExists.mockResolvedValue(false);

    await dataFetcher.fetchData();

    expect(openChargeMapServiceMock.fetchChargingStationData).toHaveBeenCalledTimes(1);
    expect(databaseServiceMock.findIfChargingStationExists).toHaveBeenCalledTimes(1);
    expect(databaseServiceMock.saveChargingStationData).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Data pulled from the API, and the DB updated successfully!',
    );
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    openChargeMapServiceMock.fetchChargingStationData.mockRejectedValue(new Error('API error'));

    await dataFetcher.fetchData();

    expect(consoleLogSpy).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error pulling data, and updating the DB: API error',
    );
  });
});
