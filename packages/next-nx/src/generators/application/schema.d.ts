import { applicationGenerator } from '@nrwl/next';

type NextApplicationGeneratorSchema = NonNullable<Parameters<typeof applicationGenerator>[1]>;

export interface ApplicationGeneratorSchema extends NextApplicationGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
}
