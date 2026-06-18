import { DataSource, DataSourceOptions } from 'typeorm'
import typeormConfig from './ormconfig'

const dataSource = new DataSource(typeormConfig as DataSourceOptions)
export default dataSource
