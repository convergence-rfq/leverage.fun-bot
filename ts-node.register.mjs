import { pathToFileURL } from 'node:url';
import { register } from 'node:module';
import tsConfigPaths from 'tsconfig-paths';

register('ts-node/esm', pathToFileURL('./src'));

const cleanup = tsConfigPaths.register({
  baseUrl: './',
  paths: {
    '@/*': ['src/*'],
  },
});

cleanup();
