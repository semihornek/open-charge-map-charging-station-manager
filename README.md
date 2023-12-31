# Open Charge Map Data Fetcher

The Open Charge Map Data Fetcher is a service that pulls data from the Open Charge Map API and stores it in a MongoDB database. It also provides a GraphQL API for querying the stored charging station data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone Repository](#clone-repository)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
  - [Data Pulling Service](#data-pulling-service)
  - [GraphQL Service](#graphql-service)
- [Running with Docker Compose](#running-with-docker-compose)
  - [Building Docker Images](#building-docker-images)
  - [Running the Docker Images](#running-the-docker-images)
  - [Stopping the Docker Containers](#stopping-the-docker-containers)
- [Testing](#testing)
- [Sending GraphQL Requests](#sending-graphql-requests)
  - [Example 1: Querying Charging Stations](#example-1-querying-charging-stations)
  - [Example 2: Querying Charging Stations with Pagination](#example-2-querying-charging-stations-with-pagination)

## Getting Started

### Prerequisites

Before running this project, you'll need the following tools and services installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (for running MongoDB and Dockerized services)
- [Docker Compose](https://docs.docker.com/compose/install/) (for running Docker Compose files)
- [Git](https://git-scm.com/) (for cloning the repository)

#### Local Prerequisites

- [MongoDB](https://www.mongodb.com/) (for running MongoDB)

### Clone Repository

Clone the repository using this command:

```bash
 git clone https://github.com/semihornek/open-charge-map-charging-station-manager
```

## Configuration

Configuration for both services is handled through environment variables. You can customize the behavior of the services by modifying the .env file.

Example .env file:

```bash
OPEN_CHARGE_MAP_API_KEY=your-api-key
MONGODB_URI=mongodb://127.0.0.1:27017/open_charge_map
```

## Running Locally

Install project dependencies:

```bash
cd open-charge-map-fetcher
yarn install
```

The project consists of two main services:

### Data Pulling Service

The Data Pulling Service is responsible for fetching charging station data from the Open Charge Map API and storing it in a MongoDB database.

To start the Data Pulling Service locally, run the following command:

```bash
yarn start-data-pull
```

### GraphQL Service

The GraphQL Service provides a GraphQL API for querying the stored charging station data. It also serves a GraphQL Playground for interactive querying.

To start the GraphQL Service locally, run the following command:

```bash
yarn start-graphql-service
```

Once the GraphQL service starts running, you can access the GraphQL Playground by opening a web browser and navigating to http://localhost:4000.

## Running with Docker Compose

### Building Docker Images

You can build Docker images for both services using the provided Dockerfiles. Here is the command to build the images:

```bash
docker compose build
```

### Running the Docker Images

You can use Docker Compose to run the entire application, including MongoDB, the Data Pulling Service, and the GraphQL Service. To do so, follow these steps:

Ensure Docker Compose is installed.

Run the application using Docker Compose:

```bash
docker compose up
```

This command will start MongoDB, the Data Pulling Service, and the GraphQL Service in separate containers.

Access the GraphQL Playground in a web browser by navigating to http://localhost:4000.

### Stopping the Docker Containers

To stop and remove the Docker containers created by docker compose up, run the following command:

```bash
docker compose down
```

This will stop and remove the containers, allowing you to clean up the resources used by the application.

## Testing

You can run unit tests and end-to-end tests to ensure the correctness of the services. Use the following command:

```bash
yarn test
```

## Sending GraphQL Requests

You can send GraphQL requests to query the charging station data. Below are two example GraphQL queries with different purposes:

### Example 1: Querying Charging Stations

Use this query to retrieve a list of charging stations:

```bash
query GetChargingStations {
  chargingStations {
    _id
    operatorInfo {
      id
      websiteURL
    }
    statusType {
      id
      isOperational
    }
    addressInfo {
      id
      title
      addressLine1
    }
    connections {
      id
      connectionType {
        id
        formalName
      }
    }
  }
}
```

This query provides basic information about charging stations without pagination.

### Example 2: Querying Charging Stations with Pagination

Use this query to retrieve charging stations with pagination for more control:

```bash
query GetChargingStationsWithPagination {
  chargingStationsWithPagination(
    last: 10 # Number of items per page
    before: 75 # Use a cursor from a previous page if needed
  ) {
    chargingStations {
      _id
      operatorInfo {
        id
        websiteURL
      }
      statusType {
        id
        isOperational
      }
      addressInfo {
        id
        title
        addressLine1
      }
      connections {
        id
        connectionType {
          id
          formalName
        }
      }
    }
    totalCount
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
}
```

This query allows you to fetch charging stations with pagination, specifying the number of items per page (last) and using a cursor from a previous page (before) if needed.

#### Params

- first: This parameter is used to specify the number of items you want to retrieve from the beginning of the list. For example, if you set first to 10, the query will return the first 10 items in the list.

- after: It represents a cursor, which is essentially a reference to a specific item in the list. When you use after, the query retrieves items after the specified cursor. This is helpful for fetching the next page of results.

- last: Similar to first, the last parameter allows you to specify the number of items you want to retrieve, but from the end of the list. For instance, if you set last to 5, the query will return the last 5 items in the list.

- before: It represents a cursor and helps you retrieve items before the specified cursor. It's useful for fetching the previous page of results.

Feel free to choose the query that best suits your needs for retrieving charging station data.

You can use tools like Postman or Insomnia to send GraphQL requests to the GraphQL API endpoint, which is available at http://localhost:4000/graphql.

Feel free to modify the GraphQL query to retrieve the specific data you need from the charging stations.
