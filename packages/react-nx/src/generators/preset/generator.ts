import { formatFiles, generateFiles, Tree } from '@nx/devkit';
import { join } from 'path';

function addFiles(tree) {
  generateFiles(tree, join(__dirname, 'files'), '.', {
    template: ''
  });
}

function deleteDefaultPrettierConfig(tree: Tree) {
  tree.delete('.prettierrc');
}

export default async function (tree: Tree) {
  deleteDefaultPrettierConfig(tree);
  addFiles(tree);

  await formatFiles(tree);
}
