import {
  formatFiles,
  generateFiles,
  Tree,
  installPackagesTask,
  addDependenciesToPackageJson,
  GeneratorCallback,
  updateJson
} from '@nx/devkit';
import { PresetGeneratorSchema } from './schema';
import { join } from 'path';
import applicationGenerator from '../application/generator';
import { runTasksInSerial } from '@nx/workspace/src/utilities/run-tasks-in-serial';

function addFiles(tree) {
  generateFiles(tree, join(__dirname, 'files'), '.', {
    template: ''
  });
}

function deleteDefaultPrettierConfig(tree: Tree) {
  tree.delete('.prettierrc');
}

function addDependencies(tree: Tree) {
  const devDependencies = {
    'eslint-plugin-unused-imports': '^2.0.0'
  };

  return addDependenciesToPackageJson(tree, {}, devDependencies);
}

function addScriptsToPackageJson(tree: Tree) {
  updateJson(tree, 'package.json', (packageJson) => {
    packageJson.scripts = {
      start: 'nx serve',
      build: 'nx build',
      test: 'nx test',
      e2e: 'nx e2e forum-e2e --watch',
      lint: 'eslint --ext .ts,.tsx ./',
      format: 'nx format && npm run lint -- --fix'
    };

    return packageJson;
  });
}

export default async function (tree: Tree, options: PresetGeneratorSchema) {
  const tasks: GeneratorCallback[] = [];

  deleteDefaultPrettierConfig(tree);

  addFiles(tree);

  await applicationGenerator(tree, options);

  await formatFiles(tree);

  addScriptsToPackageJson(tree);

  tasks.push(addDependencies(tree));

  return () => {
    installPackagesTask(tree);

    return runTasksInSerial(...tasks);
  };
}
