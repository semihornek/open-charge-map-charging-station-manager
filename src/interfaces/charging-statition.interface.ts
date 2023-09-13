interface OperatorInfo {
  websiteUrl?: string | null;
  comments?: string | null;
  phonePrimaryContact?: string | null;
  phoneSecondaryContact?: string | null;
  isPrivateIndividual?: boolean | null;
  addressInfo?: AddressInfo | null;
  bookingUrl?: string | null;
  contactEmail?: string | null;
  faultReportEmail?: string | null;
  isRestrictedEdit?: boolean | null;
  id?: number | null;
  title?: string | null;
}

interface StatusType {
  isOperational?: boolean | null;
  isUserSelectable?: boolean | null;
  id?: number | null;
  title?: string | null;
}

interface AddressInfo {
  id?: number | null;
  title?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  town?: string | null;
  stateOrProvince?: string | null;
  postcode?: string | null;
  countryId?: number | null;
  country?: {
    isoCode?: string | null;
    continentCode?: string | null;
    id?: number | null;
    title?: string | null;
  } | null;
  latitude?: number | null;
  longitude?: number | null;
  contactTelephone1?: string | null;
  contactTelephone2?: string | null;
  contactEmail?: string | null;
  accessComments?: string | null;
  relatedUrl?: string | null;
  distance?: number | null;
  distanceUnit?: number | null;
}

interface Connection {
  id?: number | null;
  connectionTypeId?: number | null;
  connectionType?: {
    formalName?: string | null;
    isDiscontinued?: boolean | null;
    isObsolete?: boolean | null;
    id?: number | null;
    title?: string | null;
  } | null;
  reference?: string | null;
  statusTypeId?: number | null;
  statusType?: StatusType | null;
  levelId?: number | null;
  level?: {
    comments?: string | null;
    isFastChargeCapable?: boolean | null;
    id?: number | null;
    title?: string | null;
  } | null;
  amps?: number | null;
  voltage?: number | null;
  powerKW?: number | null;
  currentTypeId?: number | null;
  currentType?: {
    description?: string | null;
    id?: number | null;
    title?: string | null;
  } | null;
  quantity?: number | null;
  comments?: string | null;
}

export interface ChargingStationInterface {
  _id: string;
  operatorInfo: OperatorInfo;
  statusType: StatusType;
  addressInfo: AddressInfo;
  connections: Connection[];
}
