import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree } from '@nrwl/devkit';

import generator from './generator';
import { PresetGeneratorSchema } from './schema';
import { Linter } from '@nrwl/linter';

describe('preset generator', () => {
  let appTree: Tree;
  const options: PresetGeneratorSchema = {
    name: 'test',
    skipFormat: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    e2eTestRunner: 'detox',
    js: false
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);

    expect(appTree.exists('.prettierrc')).toBeFalsy();
    expect(appTree.exists('.prettierrc.js')).toBeTruthy();
  });
});
