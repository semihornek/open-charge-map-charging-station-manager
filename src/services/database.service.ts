import dotenv from 'dotenv';
import mongoose, { FilterQuery } from 'mongoose';
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
      data.sequentialId = (await this.getLastSequentialId()) + 1;
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

  async getChargingStationsWithPagination({
    first = 0,
    after = 0,
    last = 0,
    before = 0,
  }: {
    first?: number;
    after?: number;
    last?: number;
    before?: number;
  }): Promise<{ chargingStations: ChargingStationInterface[]; totalCount: number }> {
    try {
      const query: FilterQuery<ChargingStationInterface> = {};

      // Create a query to fetch charging stations based on pagination.
      if (first && after) {
        query.sequentialId = { $gt: after };
      } else if (first && before) {
        query.sequentialId = { $gt: 0, $lt: before };
      } else if (last && before) {
        const greaterThan = before - last - 1;
        query.sequentialId = { $lt: before, $gt: greaterThan };
      } else if (last && after) {
        const lastSequentialId = await this.getLastSequentialId();
        const lessThan = lastSequentialId + 1;
        let greaterThan = lastSequentialId - last;
        if (after > greaterThan) greaterThan = after;
        query.sequentialId = { $lt: lessThan, $gt: greaterThan };
      }

      const chargingStations = await ChargingStationModel.find(query)
        .sort({ sequentialId: 1 })
        .limit(first || last)
        .exec();

      const totalCount = await ChargingStationModel.count();

      return { chargingStations, totalCount };
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Error fetching charging station data: ${error.message}`);
      else throw new Error('Error fetching charging station data');
    }
  }

  private async getLastSequentialId(): Promise<number> {
    try {
      // Find the last entry in the collection and sort it by sequentialId in descending order
      const lastEntry = await ChargingStationModel.findOne({}).sort({ sequentialId: -1 }).exec();

      return lastEntry ? lastEntry.sequentialId : 0;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error generating sequential ID: ${error.message}`);
      } else {
        throw new Error('Error generating sequential ID');
      }
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
