import { ChargingStationInterface } from '../../src/interfaces';

export const mockChargingStationData: ChargingStationInterface = {
  _id: '123',
  sequentialId: 1,
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
