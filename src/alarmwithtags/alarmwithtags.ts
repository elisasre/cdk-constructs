import { ArnFormat, CustomResource, Duration, Stack, TagManager, TagType } from 'aws-cdk-lib';
import { Alarm, AlarmBase, AlarmProps, IAlarm } from 'aws-cdk-lib/aws-cloudwatch';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

export class AlarmWithTags extends Alarm {
  /**
   * Import an existing CloudWatch alarm provided an ARN.
   * Imported alarms can be tagged, but not modified.
   *
   * @param scope The parent creating construct (usually `this`).
   * @param id The construct's name
   * @param alarmArn Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo)
   */
  public static fromAlarmArn(scope: Construct, id: string, alarmArn: string): IAlarm {
    class Import extends AlarmBase implements IAlarm {
      public readonly alarmArn = alarmArn;
      public readonly alarmName: string;
      public readonly tags = new TagManager(TagType.KEY_VALUE, 'AWS::CloudFormation:CustomResource');
      constructor() {
        super(scope, id);
        this.alarmName = Stack.of(scope).splitArn(alarmArn, ArnFormat.COLON_RESOURCE_NAME).resourceName!;
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

        const provider = new Provider(this, 'alarm-tag-provider', {
          onEventHandler: resourceHandler,
          logRetention: RetentionDays.ONE_DAY,
        });

        new CustomResource(this, id, {
          serviceToken: provider.serviceToken,
          properties: {
            Tags: this.tags.renderedTags,
            AlarmArn: this.alarmArn,
          },
        });
      }
    }
    return new Import();
  }

  public readonly tags = new TagManager(TagType.KEY_VALUE, 'AWS::CloudFormation::CustomResource');
  private provider: Provider;

  constructor(scope: Construct, id: string, props: AlarmProps) {
    super(scope, id, props);

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

    this.provider = new Provider(this, 'alarm-tag-provider', {
      onEventHandler: resourceHandler,
      logRetention: RetentionDays.ONE_DAY,
    });

    new CustomResource(this, id, {
      serviceToken: this.provider.serviceToken,
      properties: {
        Tags: this.tags.renderedTags,
        AlarmArn: this.alarmArn,
      },
    });
  }
}