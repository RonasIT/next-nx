import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { readProjectConfiguration, Tree } from "@nrwl/devkit";

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
});
