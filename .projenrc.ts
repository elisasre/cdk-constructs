import { awscdk, javascript, TaskStep, TextFile } from 'projen';
import { JobPermission } from 'projen/lib/github/workflows-model';

const nodejsVersion = '18';

// const runners = ['kaas', 'self-hosted'];

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
  workflowNodeVersion: nodejsVersion,
  // workflowRunsOn: runners,
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

project.addTask('integrationtest', {
  description: 'Runs integration tests',
  steps: integrationTestSteps,
});


project.buildWorkflow?.addPostBuildJob('integrationtest', {
  tools: {
    node: {
      version: nodejsVersion,
    },
  },
  permissions: {
    contents: JobPermission.READ,
    idToken: JobPermission.WRITE,
  },
  runsOn: ['ubuntu-latest'],
  steps: [
    {
      name: 'Checkout',
      uses: 'actions/checkout@v3',
      with: {
        ref: '${{ github.event.pull_request.head.ref }}',
        repository: '${{ github.event.pull_request.head.repo.full_name }}',
      },
    },
    {
      name: 'Install dependencies',
      run: 'npm install',
    },
    {
      name: 'Configure AWS credentials',
      uses: 'aws-actions/configure-aws-credentials@v1',
      with: {
        'role-to-assume': 'arn:aws:iam::762212084818:role/cdk-constructs-test-role',
        'role-session-name': 'cdk-constructs-test',
        'aws-region': 'eu-central-1',
      },
    },
    {
      name: 'Run integration tests',
      run: 'npx projen integrationtest',
    },
  ],
});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});

project.synth();