const typeDefs = `
  # This "OperatorInfo" type defines the fields for operatorInfo.
  type OperatorInfo {
    websiteURL: String
    comments: String
    phonePrimaryContact: String
    phoneSecondaryContact: String
    isPrivateIndividual: Boolean
    addressInfo: AddressInfo
    bookingURL: String
    contactEmail: String
    faultReportEmail: String
    isRestrictedEdit: Boolean
    id: Int
    title: String
  }

  # This "StatusType" type defines the fields for statusType.
  type StatusType {
    isOperational: Boolean
    isUserSelectable: Boolean
    id: Int
    title: String
  }

  # This "AddressInfo" type defines the fields for addressInfo.
  type AddressInfo {
    id: Int
    title: String
    addressLine1: String
    addressLine2: String
    town: String
    stateOrProvince: String
    postcode: String
    countryID: Int
    country: Country
    latitude: Float
    longitude: Float
    contactTelephone1: String
    contactTelephone2: String
    contactEmail: String
    accessComments: String
    relatedURL: String
    distance: Float
    distanceUnit: Int
  }

  type Country {
    isoCode: String
    continentCode: String
    id: Int
    title: String
  }

  # This "Connections" type defines the fields for Connections.
  type Connections {
    id: Int
    connectionTypeID: Int
    connectionType: ConnectionType
    reference: String
    statusTypeID: Int
    statusType: StatusType
    levelID: Int
    level: Level
    amps: Int
    voltage: Int
    powerKW: Float
    currentTypeID: Int
    currentType: CurrentType
    quantity: Int
    comments: String
  }
  
  type ConnectionType {
    formalName: String
    isDiscontinued: Boolean
    isObsolete: Boolean
    id: Int
    title: String
  }
  
  type StatusType {
    isOperational: Boolean
    isUserSelectable: Boolean
    id: Int
    title: String
  }  

  type Level {
    comments: String
    isFastChargeCapable: Boolean
    id: Int
    title: String
  }
  
  type CurrentType {
    description: String
    id: Int
    title: String
  }
  
  # This "ChargingStation" type defines the fields for ChargingStation.
  type ChargingStation {
    _id: String
    operatorInfo: OperatorInfo
    statusType: StatusType
    addressInfo: AddressInfo
    connections: [Connections]
  }

  # The "Query" type defines the available queries.
  type Query {
    chargingStations: [ChargingStation!]!
  }
`;

export { typeDefs };
