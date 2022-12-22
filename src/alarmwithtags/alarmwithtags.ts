import { CustomResource, Duration } from 'aws-cdk-lib';
import { Alarm, AlarmProps } from 'aws-cdk-lib/aws-cloudwatch';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

export interface AlarmWithTagsProps extends AlarmProps {
  readonly tags: {
    [key: string]: string;
  };
}
export class AlarmWithTags extends Alarm {
  constructor(scope: Construct, id: string, props: AlarmWithTagsProps) {
    super(scope, id, props);

    const tags = Object.keys(props.tags).map((key) => {
      return { Key: key, Value: props.tags[key] };
    });

    const resourceHandler = new NodejsFunction(this, 'custom-resource-lambda', {
      description: 'Create, Delete or Update alarm tags',
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(30),
      initialPolicy: [
        new PolicyStatement({
          actions: ['cloudwatch:TagResource', 'cloudwatch:UntagResource'],
          resources: ['*'],
        }),
      ],
    });

    const alarmTagProvider = new Provider(this, 'alarm-tag-provider', {
      onEventHandler: resourceHandler,
      logRetention: RetentionDays.ONE_DAY,
    });

    new CustomResource(this, id, {
      serviceToken: alarmTagProvider.serviceToken,
      properties: {
        Tags: tags,
        AlarmArn: this.alarmArn,
      },
    });
  }
}
