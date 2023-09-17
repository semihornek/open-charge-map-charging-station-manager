import { DATA_PULLING_INTERVAL } from '../../constants';
import { DatabaseService } from '../database.service';
import { OpenChargeMapService } from './api';
import { DataFetcher } from './fetch-data.service';

const dataFetcher = new DataFetcher(new OpenChargeMapService(), DatabaseService.getInstance());
dataFetcher.fetchData(1000);
setInterval(() => dataFetcher.fetchData(), DATA_PULLING_INTERVAL);
