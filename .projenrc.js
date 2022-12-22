const { awscdk, javascript } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Juho Majasaari',
  authorAddress: 'ext-juho.majasaari@elisa.fi',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-constructs',
  packageManager: javascript.NodePackageManager.NPM,
  repositoryUrl: 'https://github.com/ext-juho.majasaari/cdk-constructs.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();