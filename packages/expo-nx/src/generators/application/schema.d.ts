import { expoApplicationGenerator } from '@nrwl/expo';

type ExpoApplicationGeneratorSchema = NonNullable<Parameters<typeof expoApplicationGenerator>[1]>;

export interface ApplicationGeneratorSchema extends ExpoApplicationGeneratorSchema {
    name: string;
    tags?: string;
    directory?: string;
}
