import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import generator from './generator';
import { ApplicationGeneratorSchema } from './schema';
import { Linter } from '@nx/linter';

describe('application generator', () => {
  let appTree: Tree;
  const options: ApplicationGeneratorSchema = {
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
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
