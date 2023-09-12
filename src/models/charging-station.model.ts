import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ChargingStationInterface } from '../interfaces';

const chargingStationSchema = new Schema<ChargingStationInterface>({
  _id: {
    type: String,
    default: uuidv4,
  },
  operatorInfo: {
    type: Object,
    default: null,
  },
  statusType: {
    type: Object,
    default: null,
  },
  addressInfo: {
    type: Object,
    default: null,
  },
  connections: {
    type: Schema.Types.Mixed,
    default: null,
  },
});

export const ChargingStationModel = mongoose.model<ChargingStationInterface>(
  'charging_station',
  chargingStationSchema,
);
