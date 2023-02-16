import { getWorkspaceLayout, Tree } from '@nrwl/devkit';
import { ApplicationGeneratorSchema } from './schema';
import { applicationGenerator } from '@nrwl/next';

export default function (tree: Tree, options: ApplicationGeneratorSchema) {
  return applicationGenerator(tree, options);
}
