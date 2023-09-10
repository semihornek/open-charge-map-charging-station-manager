const typeDefs = `
  # This "OperatorInfo" type defines the fields for operatorInfo.
  type OperatorInfo {
    WebsiteURL: String
    Comments: String
    PhonePrimaryContact: String
    PhoneSecondaryContact: String
    IsPrivateIndividual: Boolean
    AddressInfo: AddressInfo
    BookingURL: String
    ContactEmail: String
    FaultReportEmail: String
    IsRestrictedEdit: Boolean
    ID: Int
    Title: String
  }

  # This "StatusType" type defines the fields for statusType.
  type StatusType {
    IsOperational: Boolean
    IsUserSelectable: Boolean
    ID: Int
    Title: String
  }

  # This "AddressInfo" type defines the fields for addressInfo.
  type AddressInfo {
    ID: Int
    Title: String
    AddressLine1: String
    AddressLine2: String
    Town: String
    StateOrProvince: String
    Postcode: String
    CountryID: Int
    Country: Country
    Latitude: Float
    Longitude: Float
    ContactTelephone1: String
    ContactTelephone2: String
    ContactEmail: String
    AccessComments: String
    RelatedURL: String
    Distance: Float
    DistanceUnit: Int
  }

  type Country {
    ISOCode: String
    ContinentCode: String
    ID: Int
    Title: String
  }

  # This "Connections" type defines the fields for Connections.
  type Connections {
    ID: Int
    ConnectionTypeID: Int
    ConnectionType: ConnectionType
    Reference: String
    StatusTypeID: Int
    StatusType: StatusType
    LevelID: Int
    Level: Level
    Amps: Int
    Voltage: Int
    PowerKW: Float
    CurrentTypeID: Int
    CurrentType: CurrentType
    Quantity: Int
    Comments: String
  }
  
  type ConnectionType {
    FormalName: String
    IsDiscontinued: Boolean
    IsObsolete: Boolean
    ID: Int
    Title: String
  }

  type StatusType {
    IsOperational: Boolean
    IsUserSelectable: Boolean
    ID: Int
    Title: String
  }

  type Level {
    Comments: String
    IsFastChargeCapable: Boolean
    ID: Int
    Title: String
  }
  
  type CurrentType {
    Description: String
    ID: Int
    Title: String
  }
  
  # This "ChargingStation" type defines the fields for ChargingStation.
  type ChargingStation {
    OperatorInfo: OperatorInfo
    StatusType: StatusType
    AddressInfo: AddressInfo
    Connections: [Connections]
  }

  # The "Query" type defines the available queries.
  type Query {
    chargingStations: [ChargingStation!]!
  }
`;

export { typeDefs };
