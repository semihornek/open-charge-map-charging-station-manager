import mongoose from 'mongoose';
import { ChargingStationInterface } from '../interfaces';
import { ChargingStationModel } from '../models/charging-station.model';

export class DatabaseService {
  private readonly uri: string;
  private static instance: DatabaseService | null = null;
  private isConnected: boolean = false;

  private constructor() {
    this.uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/open_charge_map';
    this.connect();
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await mongoose.connect(this.uri);
        this.isConnected = true;
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error(
          `Failed to connect to MongoDB${error instanceof Error && ': ' + error.message}`,
        );
      }
    }
  }

  async saveChargingStationData(data: ChargingStationInterface): Promise<void> {
    try {
      await ChargingStationModel.create(data);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error saving charging station data: ${error.message}`);
      else throw new Error('Error saving charging station data');
    }
  }

  async findIfChargingStationExists(id: string): Promise<boolean> {
    try {
      const chargingStations = await ChargingStationModel.exists({ _id: id });
      return !!chargingStations;
    } catch (error) {
      console.error('Error finding charging stations:', error);
      return false;
    }
  }

  async getChargingStations(): Promise<ChargingStationInterface[]> {
    try {
      const chargingStations = await ChargingStationModel.find();
      return chargingStations;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error saving charging station data: ${error.message}`);
      else throw new Error('Error saving charging station data');
    }
  }

  async closeConnection(): Promise<void> {
    if (this.isConnected) {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      this.isConnected = false;
    }
  }
}
