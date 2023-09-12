import mongoose from 'mongoose';
import { ChargingStationInterface } from '../../interfaces';
import { ChargingStationModel } from '../../models/charging-station.model';

export class DatabaseService {
  private readonly uri: string;

  constructor() {
    this.uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/open_charge_map';
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(this.uri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error(
        `Failed to connect to MongoDB${error instanceof Error && ': ' + error.message}`,
      );
    }
  }

  async saveChargingStationData(data: ChargingStationInterface[]) {
    try {
      await ChargingStationModel.insertMany(data);
      console.log('Charging station data saved to the database');
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error saving charging station data: ${error.message}`);
      else throw new Error('Error saving charging station data');
    }
  }

  async findChargingStations() {
    try {
      const chargingStations = await ChargingStationModel.find().exec();
      return chargingStations;
    } catch (error) {
      console.error('Error finding charging stations:', error);
      return [];
    }
  }
}
