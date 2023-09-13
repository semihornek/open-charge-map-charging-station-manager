import { ChargingStationInterface } from '../../interfaces';

export const mockChargingStationData: ChargingStationInterface = {
  _id: '123',
  operatorInfo: { title: 'Operator' },
  statusType: { title: 'Operational' },
  addressInfo: { town: 'City' },
  connections: [{ connectionType: { title: 'Type' } }],
};

export const mockChargingStationAxiosResponse = {
  uuid: '123',
  operatorInfo: { title: 'Operator' },
  statusType: { title: 'Operational' },
  addressInfo: { town: 'City' },
  connections: [{ connectionType: { title: 'Type' } }],
};
