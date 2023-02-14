import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { readProjectConfiguration, Tree, readJson } from '@nrwl/devkit';

import generator from './generator';
import { PresetGeneratorSchema } from './schema';

describe('preset generator', () => {
  let appTree: Tree;
  const options: PresetGeneratorSchema = { name: 'test', style: 'scss' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should be defined in project configuration successfully', async () => {
    await generator(appTree, options);

    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });

  it('should run successfully', async () => {
    const result = await generator(appTree, options);

    expect(result).toBeInstanceOf(Function);
  });

  it('should replace prettierrc config', async () => {
    await generator(appTree, options);

    expect(appTree.exists('.prettierrc')).toBeFalsy();
    expect(appTree.exists('.prettierrc.js')).toBeTruthy();
  });

  it('should replace eslint config and install necessary dependencies', async () => {
    await generator(appTree, options);

    const eslintrcJson = readJson(appTree, '.eslintrc.json');
    expect(eslintrcJson.root).toBeTruthy();

    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson.devDependencies).toHaveProperty('eslint-plugin-unused-imports');
  });

  it('should update scripts in package.json', async () => {
    await generator(appTree, options);

    const packageJson = readJson(appTree, 'package.json');
    expect(packageJson.scripts).toEqual({
      start: 'nx serve',
      build: 'nx build',
      test: 'nx test',
      e2e: 'nx e2e forum-e2e --watch',
      lint: 'eslint --ext .ts,.tsx ./',
      format: 'nx format && npm run lint -- --fix'
    });
  });
});
