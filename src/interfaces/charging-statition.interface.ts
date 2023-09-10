import { Document } from 'mongoose';

interface OperatorInfo {
  WebsiteURL?: string | null;
  Comments?: string | null;
  PhonePrimaryContact?: string | null;
  PhoneSecondaryContact?: string | null;
  IsPrivateIndividual?: boolean | null;
  AddressInfo?: AddressInfo | null;
  BookingURL?: string | null;
  ContactEmail?: string | null;
  FaultReportEmail?: string | null;
  IsRestrictedEdit?: boolean | null;
  ID?: number | null;
  Title?: string | null;
}

interface StatusType {
  IsOperational?: boolean | null;
  IsUserSelectable?: boolean | null;
  ID?: number | null;
  Title?: string | null;
}

interface AddressInfo {
  ID?: number | null;
  Title?: string | null;
  AddressLine1?: string | null;
  AddressLine2?: string | null;
  Town?: string | null;
  StateOrProvince?: string | null;
  Postcode?: string | null;
  CountryID?: number | null;
  Country?: {
    ISOCode?: string | null;
    ContinentCode?: string | null;
    ID?: number | null;
    Title?: string | null;
  } | null;
  Latitude?: number | null;
  Longitude?: number | null;
  ContactTelephone1?: string | null;
  ContactTelephone2?: string | null;
  ContactEmail?: string | null;
  AccessComments?: string | null;
  RelatedURL?: string | null;
  Distance?: number | null;
  DistanceUnit?: number | null;
}

interface Connection {
  ID?: number | null;
  ConnectionTypeID?: number | null;
  ConnectionType?: {
    FormalName?: string | null;
    IsDiscontinued?: boolean | null;
    IsObsolete?: boolean | null;
    ID?: number | null;
    Title?: string | null;
  } | null;
  Reference?: string | null;
  StatusTypeID?: number | null;
  StatusType?: StatusType | null;
  LevelID?: number | null;
  Level?: {
    Comments?: string | null;
    IsFastChargeCapable?: boolean | null;
    ID?: number | null;
    Title?: string | null;
  } | null;
  Amps?: number | null;
  Voltage?: number | null;
  PowerKW?: number | null;
  CurrentTypeID?: number | null;
  CurrentType?: {
    Description?: string | null;
    ID?: number | null;
    Title?: string | null;
  } | null;
  Quantity?: number | null;
  Comments?: string | null;
}

export interface ChargingStationInterface extends Document {
  _id: string;
  operatorInfo: OperatorInfo;
  statusType: StatusType;
  addressInfo: AddressInfo;
  Connections: Connection[];
}
