import { Tree } from '@nrwl/devkit';
import { PresetGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: PresetGeneratorSchema
) {
  console.log('This is test of the preset');
}
