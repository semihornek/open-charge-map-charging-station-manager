import axios from 'axios';
import dotenv from 'dotenv';

import { ChargingStationInterface, POIListInterface } from '../../../interfaces';
import { OPEN_CHARGE_MAP_API_URL } from '../../../constants';

// Load environment variables from .env file
dotenv.config();

export class OpenChargeMapService {
  constructor() {}

  async fetchChargingStationData(maxresults: number): Promise<ChargingStationInterface[]> {
    try {
      const response = await axios.get(OPEN_CHARGE_MAP_API_URL, {
        params: {
          output: 'json',
          key: process.env.OPEN_CHARGE_MAP_API_KEY,
          camelcase: true,
          maxresults,
        },
      });
      const data: ChargingStationInterface[] = response.data.map((res: POIListInterface) => ({
        _id: res.uuid,
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
