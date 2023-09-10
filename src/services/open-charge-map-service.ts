import axios from 'axios';
import dotenv from 'dotenv';

import { POIListInterface } from '../interfaces';
import { OPEN_CHARGE_MAP_API_URL } from '../constants';

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
  ): Promise<POIListInterface[]> {
    try {
      const response = await axios.get(OPEN_CHARGE_MAP_API_URL, {
        params: {
          output: 'json',
          key: this.apiKey,
          page: page,
          maxresults: maxResults,
        },
      });
      const data: POIListInterface[] = response.data.map((res: POIListInterface) => ({
        OperatorInfo: res.OperatorInfo,
        StatusType: res.StatusType,
        AddressInfo: res.AddressInfo,
        Connections: res.Connections,
      }));

      return data;
    } catch (error) {
      const errorMessage = 'Failed to fetch charging station data';
      if (error instanceof Error) throw new Error(`${errorMessage}: ${error.message}`);
      else throw new Error(errorMessage);
    }
  }
}
