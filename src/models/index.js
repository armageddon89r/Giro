// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Photo, Person } = initSchema(schema);

export {
  Photo,
  Person
};