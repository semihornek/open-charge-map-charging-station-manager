# Open Charge Map Data Fetcher

The Open Charge Map Data Fetcher is a service that pulls data from the Open Charge Map API and stores it in a MongoDB database. It also provides a GraphQL API for querying the stored charging station data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
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

## Getting Started

### Prerequisites

Before running this project, you'll need the following tools and services installed:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (for running MongoDB and Dockerized services)
- [Docker Compose](https://docs.docker.com/compose/install/) (for running Docker Compose files)

### Installation

1. Clone the repository:

```bash
 git clone https://github.com/semihornek/open-charge-map-charging-station-manager
```

```bash
cd open-charge-map-fetcher
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

You can send GraphQL requests to query the charging station data. Here's an example GraphQL query:

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

You can use tools like Postman or Insomnia to send GraphQL requests to the GraphQL API endpoint, which is available at http://localhost:4000/graphql.

Feel free to modify the GraphQL query to retrieve the specific data you need from the charging stations.

```

```
