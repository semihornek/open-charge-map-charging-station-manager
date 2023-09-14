import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ChargingStationInterface } from '../interfaces';
import { ChargingStationModel } from '../models/charging-station.model';

dotenv.config();

export class DatabaseService {
  private readonly uri: string;
  private static instance: DatabaseService | null = null;
  private isConnected: boolean = false;

  private constructor(url: string | null = null) {
    this.uri = url || process.env.MONGODB_URI!;
    this.connect();
  }

  static getInstance(url: string | null = null): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService(url);
    }
    return DatabaseService.instance;
  }

  private async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await mongoose.connect(this.uri);
        this.isConnected = true;
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
      if (error instanceof Error) console.error('Error finding charging stations:', error.message);
      else console.error('Error finding charging stations');
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
