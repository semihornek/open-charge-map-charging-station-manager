import mongoose from 'mongoose';
import { ChargingStationInterface } from '../../src/interfaces';
import { ChargingStationModel } from '../../src/models';
import { DatabaseService } from '../../src/services/database.service';

describe('DatabaseService E2E Tests', () => {
  let databaseService: DatabaseService;
  const testData: ChargingStationInterface = {
    _id: 'testId',
    sequentialId: 1,
    operatorInfo: null as never,
    statusType: null as never,
    addressInfo: null as never,
    connections: [],
  };

  beforeAll(async () => {
    // Create an instance of DatabaseService
    databaseService = DatabaseService.getInstance('mongodb://127.0.0.1:27017/open_charge_map_test');
    await ChargingStationModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await ChargingStationModel.deleteMany({});
  });

  it('should save and retrieve charging station data', async () => {
    await databaseService.saveChargingStationData(testData);

    const exists = await databaseService.findIfChargingStationExists('testId');
    expect(exists).toBe(true);

    const chargingStations = await databaseService.getChargingStations();

    expect(chargingStations.length).toBe(1);
    expect(chargingStations[0]._id).toBe('testId');
  });

  it('should handle errors', async () => {
    jest.spyOn(ChargingStationModel, 'exists').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });

    const result = await databaseService.findIfChargingStationExists('nonExistentId');

    expect(result).toBe(false);
  });
});
