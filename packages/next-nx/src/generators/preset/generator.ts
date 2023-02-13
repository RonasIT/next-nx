import { formatFiles, generateFiles, Tree } from '@nrwl/devkit';
import { PresetGeneratorSchema } from './schema';
import { join } from 'path';
import applicationGenerator from '../application/generator';

function addFiles(tree) {
  generateFiles(tree, join(__dirname, 'files'), '.', {
    template: ''
  });
}

function deleteDefaultPrettierConfig(tree: Tree) {
  tree.delete('.prettierrc');
}

export default async function (
  tree: Tree,
  options: PresetGeneratorSchema
) {
  deleteDefaultPrettierConfig(tree);
  addFiles(tree);

  await applicationGenerator(tree, options);

  await formatFiles(tree);
}
