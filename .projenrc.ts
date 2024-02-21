import { awscdk, javascript, TaskStep, TextFile } from 'projen';
import { GithubCredentials } from 'projen/lib/github';
import { JobPermission } from 'projen/lib/github/workflows-model';

const nodejsVersion = '18';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Elisa SRE',
  keywords: ['aws', 'cdk', 'constructs'],
  depsUpgrade: false,
  authorAddress: '',
  cdkVersion: '2.128.0',
  defaultReleaseBranch: 'main',
  name: '@elisasre/cdk-constructs',
  packageManager: javascript.NodePackageManager.NPM,
  repositoryUrl: 'https://github.com/elisasre/cdk-constructs.git',
  bundledDeps: ['cfn-response', 'aws-sdk'],
  description: 'Constructs for AWS CDK',
  devDeps: ['esbuild', '@aws-cdk/integ-tests-alpha', '@aws-cdk/integ-runner', '@types/cfn-response', '@types/aws-lambda'],
  gitignore: ['test/cdk-integ.out*'],
  releaseToNpm: true,
  npmRegistryUrl: 'https://npm.pkg.github.com',
  githubOptions: {
    mergify: false,
    projenCredentials: GithubCredentials.fromPersonalAccessToken({ secret: 'DEVOPS_CI_PAT' }),
  },
  dependabot: true,
  licensed: false,
  projenrcTs: true,
  workflowNodeVersion: nodejsVersion,
});


const integrationTestSteps: TaskStep[] = [
  {
    name: 'integration-test',
    exec: [
      'integ-runner',
      '--app="ts-node {filePath}"',
      '--test-regex="test/integ\.[a-z-_]+.ts$"',
      '--parallel-regions=eu-central-1',
      '--update-on-failed',
    ].join(' '),
  },
];

const integrationTestPreSteps = ['default', 'compile']
  .map((taskName) => project.tasks.tryFind(taskName))
  .filter(task => task !== undefined)
  .reduce((acc, task) => [...acc, ...task?.steps ?? []], [] as TaskStep[]);


project.addTask('integrationtest', {
  description: 'Runs integration tests',
  steps: [...integrationTestPreSteps, ...integrationTestSteps],
});

project.buildWorkflow?.addPostBuildJob('integrationtest', {
  concurrency: {
    group: 'integrationtest',
  },
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
      uses: 'aws-actions/configure-aws-credentials@v4',
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


project.buildWorkflow?.addPostBuildJob('automerge', {
  needs: ['integrationtest'],
  permissions: {
    pullRequests: JobPermission.WRITE,
    contents: JobPermission.WRITE,
  },
  runsOn: ['ubuntu-latest'],
  steps: [
    {
      name: 'Automerge dependabot PR',
      uses: 'elisa-actions/github-action-merge-dependabot@v3',
      with: {
        'target': 'minor',
        'github-token': '${{ secrets.DOPS_SRE_PAT }}',
      },
    },
  ],
});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});

project.synth();
