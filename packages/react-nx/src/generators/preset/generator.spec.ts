import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import generator from './generator';

describe('preset generator', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree);

    expect(appTree.exists('.prettierrc')).toBeFalsy();
    expect(appTree.exists('.prettierrc.js')).toBeTruthy();
  });
});
