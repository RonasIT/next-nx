import {
  formatFiles,
  generateFiles,
  Tree,
  installPackagesTask,
  addDependenciesToPackageJson,
  GeneratorCallback
} from "@nrwl/devkit";
import { PresetGeneratorSchema } from './schema';
import { join } from 'path';
import applicationGenerator from '../application/generator';
import { runTasksInSerial } from "@nrwl/workspace/src/utilities/run-tasks-in-serial";

function addFiles(tree) {
  generateFiles(tree, join(__dirname, 'files'), '.', {
    template: ''
  });
}

function deleteDefaultPrettierConfig(tree: Tree) {
  tree.delete('.prettierrc');
}

function addEslintRules(tree: Tree) {
  const devDependencies = {
    'eslint-plugin-unused-imports': '^2.0.0'
  };

  return addDependenciesToPackageJson(tree, {}, devDependencies);
}

export default async function (
  tree: Tree,
  options: PresetGeneratorSchema
) {
  const tasks: GeneratorCallback[] = [];

  deleteDefaultPrettierConfig(tree);

  tasks.push(addEslintRules(tree));

  addFiles(tree);

  await applicationGenerator(tree, options);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);

    return runTasksInSerial(...tasks);
  };
}
