import axios from 'axios';
import dotenv from 'dotenv';

import { ChargingStationInterface, POIListInterface } from '../../interfaces';
import { OPEN_CHARGE_MAP_API_URL } from '../../constants';

// Load environment variables from .env file
dotenv.config();

export class OpenChargeMapService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPEN_CHARGE_MAP_API_KEY!;
  }

  async fetchChargingStationData(
    page: number = 1,
    maxResults: number = 2,
  ): Promise<ChargingStationInterface[]> {
    try {
      const response = await axios.get(OPEN_CHARGE_MAP_API_URL, {
        params: {
          output: 'json',
          key: this.apiKey,
          page: page,
          maxresults: maxResults,
          camelcase: true,
        },
      });
      const data: ChargingStationInterface[] = response.data.map((res: POIListInterface) => ({
        operatorInfo: res.operatorInfo,
        statusType: res.statusType,
        addressInfo: res.addressInfo,
        connections: res.connections,
      }));

      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(`Failed to fetch charging station data: ${error.message}`);
      else throw new Error('Failed to fetch charging station data');
    }
  }
}
