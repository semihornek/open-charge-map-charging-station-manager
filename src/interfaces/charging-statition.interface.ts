import { Document } from "mongoose";

export interface ChargingStationInterface extends Document {
  _id: string;
  operatorInfo: string;
  statusType: string;
  addressInfo: string;
  Connections: string;
}
