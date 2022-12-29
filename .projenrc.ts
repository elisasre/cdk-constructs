import { awscdk, javascript, TaskStep } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Elisa SRE',
  authorAddress: '',
  cdkVersion: '2.57.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-constructs',
  packageManager: javascript.NodePackageManager.NPM,
  repositoryUrl: 'https://github.com/elisasre/cdk-constructs.git',
  bundledDeps: ['cfn-response', 'aws-sdk'],
  description: 'Constructs for AWS CDK',
  devDeps: ['esbuild', '@aws-cdk/integ-tests-alpha', '@aws-cdk/integ-runner', '@types/cfn-response', '@types/aws-lambda'],
  packageName: 'cdk-constructs',
  gitignore: ['src/**/*.js', 'test/**/*.js', '**/*d.ts'],
  licensed: false,
  releaseToNpm: false,
  projenrcTs: true,
});

const integrationTestSteps: TaskStep[] = [
  {
    name: 'tsc',
    exec: `tsc --build ${project.tsconfigDev.fileName}`,
  },
  {
    name: 'integration-test',
    exec: 'integ-runner --parallel-regions=eu-central-1',
  },
];

project.addTask('integration-test', {
  steps: integrationTestSteps,
});

project.synth();