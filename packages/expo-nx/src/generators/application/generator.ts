import { Tree } from '@nrwl/devkit';
import { ApplicationGeneratorSchema } from './schema';
import { expoApplicationGenerator } from '@nrwl/expo';

export default function (tree: Tree, options: ApplicationGeneratorSchema) {
  return expoApplicationGenerator(tree, options);
}
