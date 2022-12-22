# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AlarmWithTags <a name="AlarmWithTags" id="cdk-constructs.AlarmWithTags"></a>

#### Initializers <a name="Initializers" id="cdk-constructs.AlarmWithTags.Initializer"></a>

```typescript
import { AlarmWithTags } from 'cdk-constructs'

new AlarmWithTags(scope: Construct, id: string, props: AlarmWithTagsProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-constructs.AlarmWithTags.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-constructs.AlarmWithTags.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-constructs.AlarmWithTags.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-constructs.AlarmWithTagsProps">AlarmWithTagsProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-constructs.AlarmWithTags.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-constructs.AlarmWithTags.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-constructs.AlarmWithTags.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-constructs.AlarmWithTagsProps">AlarmWithTagsProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-constructs.AlarmWithTags.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-constructs.AlarmWithTags.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#cdk-constructs.AlarmWithTags.addAlarmAction">addAlarmAction</a></code> | Trigger this action if the alarm fires. |
| <code><a href="#cdk-constructs.AlarmWithTags.addInsufficientDataAction">addInsufficientDataAction</a></code> | Trigger this action if there is insufficient data to evaluate the alarm. |
| <code><a href="#cdk-constructs.AlarmWithTags.addOkAction">addOkAction</a></code> | Trigger this action if the alarm returns from breaching state into ok state. |
| <code><a href="#cdk-constructs.AlarmWithTags.renderAlarmRule">renderAlarmRule</a></code> | AlarmRule indicating ALARM state for Alarm. |
| <code><a href="#cdk-constructs.AlarmWithTags.toAnnotation">toAnnotation</a></code> | Turn this alarm into a horizontal annotation. |

---

##### `toString` <a name="toString" id="cdk-constructs.AlarmWithTags.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="cdk-constructs.AlarmWithTags.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="cdk-constructs.AlarmWithTags.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addAlarmAction` <a name="addAlarmAction" id="cdk-constructs.AlarmWithTags.addAlarmAction"></a>

```typescript
public addAlarmAction(actions: IAlarmAction): void
```

Trigger this action if the alarm fires.

Typically the ARN of an SNS topic or ARN of an AutoScaling policy.

###### `actions`<sup>Required</sup> <a name="actions" id="cdk-constructs.AlarmWithTags.addAlarmAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `addInsufficientDataAction` <a name="addInsufficientDataAction" id="cdk-constructs.AlarmWithTags.addInsufficientDataAction"></a>

```typescript
public addInsufficientDataAction(actions: IAlarmAction): void
```

Trigger this action if there is insufficient data to evaluate the alarm.

Typically the ARN of an SNS topic or ARN of an AutoScaling policy.

###### `actions`<sup>Required</sup> <a name="actions" id="cdk-constructs.AlarmWithTags.addInsufficientDataAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `addOkAction` <a name="addOkAction" id="cdk-constructs.AlarmWithTags.addOkAction"></a>

```typescript
public addOkAction(actions: IAlarmAction): void
```

Trigger this action if the alarm returns from breaching state into ok state.

Typically the ARN of an SNS topic or ARN of an AutoScaling policy.

###### `actions`<sup>Required</sup> <a name="actions" id="cdk-constructs.AlarmWithTags.addOkAction.parameter.actions"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarmAction

---

##### `renderAlarmRule` <a name="renderAlarmRule" id="cdk-constructs.AlarmWithTags.renderAlarmRule"></a>

```typescript
public renderAlarmRule(): string
```

AlarmRule indicating ALARM state for Alarm.

##### `toAnnotation` <a name="toAnnotation" id="cdk-constructs.AlarmWithTags.toAnnotation"></a>

```typescript
public toAnnotation(): HorizontalAnnotation
```

Turn this alarm into a horizontal annotation.

This is useful if you want to represent an Alarm in a non-AlarmWidget.
An `AlarmWidget` can directly show an alarm, but it can only show a
single alarm and no other metrics. Instead, you can convert the alarm to
a HorizontalAnnotation and add it as an annotation to another graph.

This might be useful if:

- You want to show multiple alarms inside a single graph, for example if
   you have both a "small margin/long period" alarm as well as a
   "large margin/short period" alarm.

- You want to show an Alarm line in a graph with multiple metrics in it.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-constructs.AlarmWithTags.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdk-constructs.AlarmWithTags.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#cdk-constructs.AlarmWithTags.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#cdk-constructs.AlarmWithTags.fromAlarmArn">fromAlarmArn</a></code> | Import an existing CloudWatch alarm provided an ARN. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-constructs.AlarmWithTags.isConstruct"></a>

```typescript
import { AlarmWithTags } from 'cdk-constructs'

AlarmWithTags.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-constructs.AlarmWithTags.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="cdk-constructs.AlarmWithTags.isOwnedResource"></a>

```typescript
import { AlarmWithTags } from 'cdk-constructs'

AlarmWithTags.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-constructs.AlarmWithTags.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="cdk-constructs.AlarmWithTags.isResource"></a>

```typescript
import { AlarmWithTags } from 'cdk-constructs'

AlarmWithTags.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-constructs.AlarmWithTags.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromAlarmArn` <a name="fromAlarmArn" id="cdk-constructs.AlarmWithTags.fromAlarmArn"></a>

```typescript
import { AlarmWithTags } from 'cdk-constructs'

AlarmWithTags.fromAlarmArn(scope: Construct, id: string, alarmArn: string)
```

Import an existing CloudWatch alarm provided an ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-constructs.AlarmWithTags.fromAlarmArn.parameter.scope"></a>

- *Type:* constructs.Construct

The parent creating construct (usually `this`).

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-constructs.AlarmWithTags.fromAlarmArn.parameter.id"></a>

- *Type:* string

The construct's name.

---

###### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="cdk-constructs.AlarmWithTags.fromAlarmArn.parameter.alarmArn"></a>

- *Type:* string

Alarm ARN (i.e. arn:aws:cloudwatch:<region>:<account-id>:alarm:Foo).

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-constructs.AlarmWithTags.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-constructs.AlarmWithTags.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#cdk-constructs.AlarmWithTags.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#cdk-constructs.AlarmWithTags.property.alarmArn">alarmArn</a></code> | <code>string</code> | ARN of this alarm. |
| <code><a href="#cdk-constructs.AlarmWithTags.property.alarmName">alarmName</a></code> | <code>string</code> | Name of this alarm. |
| <code><a href="#cdk-constructs.AlarmWithTags.property.metric">metric</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IMetric</code> | The metric object this alarm was based on. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-constructs.AlarmWithTags.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="cdk-constructs.AlarmWithTags.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="cdk-constructs.AlarmWithTags.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `alarmArn`<sup>Required</sup> <a name="alarmArn" id="cdk-constructs.AlarmWithTags.property.alarmArn"></a>

```typescript
public readonly alarmArn: string;
```

- *Type:* string

ARN of this alarm.

---

##### `alarmName`<sup>Required</sup> <a name="alarmName" id="cdk-constructs.AlarmWithTags.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string

Name of this alarm.

---

##### `metric`<sup>Required</sup> <a name="metric" id="cdk-constructs.AlarmWithTags.property.metric"></a>

```typescript
public readonly metric: IMetric;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IMetric

The metric object this alarm was based on.

---


## Structs <a name="Structs" id="Structs"></a>

### AlarmWithTagsProps <a name="AlarmWithTagsProps" id="cdk-constructs.AlarmWithTagsProps"></a>

#### Initializer <a name="Initializer" id="cdk-constructs.AlarmWithTagsProps.Initializer"></a>

```typescript
import { AlarmWithTagsProps } from 'cdk-constructs'

const alarmWithTagsProps: AlarmWithTagsProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.evaluationPeriods">evaluationPeriods</a></code> | <code>number</code> | The number of periods over which data is compared to the specified threshold. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.threshold">threshold</a></code> | <code>number</code> | The value against which the specified statistic is compared. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.actionsEnabled">actionsEnabled</a></code> | <code>boolean</code> | Whether the actions for this alarm are enabled. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.alarmDescription">alarmDescription</a></code> | <code>string</code> | Description for the alarm. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.alarmName">alarmName</a></code> | <code>string</code> | Name of the alarm. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.comparisonOperator">comparisonOperator</a></code> | <code>aws-cdk-lib.aws_cloudwatch.ComparisonOperator</code> | Comparison to use to check if metric is breaching. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.datapointsToAlarm">datapointsToAlarm</a></code> | <code>number</code> | The number of datapoints that must be breaching to trigger the alarm. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.evaluateLowSampleCountPercentile">evaluateLowSampleCountPercentile</a></code> | <code>string</code> | Specifies whether to evaluate the data and potentially change the alarm state if there are too few data points to be statistically significant. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.treatMissingData">treatMissingData</a></code> | <code>aws-cdk-lib.aws_cloudwatch.TreatMissingData</code> | Sets how this alarm is to handle missing data points. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.metric">metric</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IMetric</code> | The metric to add the alarm on. |
| <code><a href="#cdk-constructs.AlarmWithTagsProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `evaluationPeriods`<sup>Required</sup> <a name="evaluationPeriods" id="cdk-constructs.AlarmWithTagsProps.property.evaluationPeriods"></a>

```typescript
public readonly evaluationPeriods: number;
```

- *Type:* number

The number of periods over which data is compared to the specified threshold.

---

##### `threshold`<sup>Required</sup> <a name="threshold" id="cdk-constructs.AlarmWithTagsProps.property.threshold"></a>

```typescript
public readonly threshold: number;
```

- *Type:* number

The value against which the specified statistic is compared.

---

##### `actionsEnabled`<sup>Optional</sup> <a name="actionsEnabled" id="cdk-constructs.AlarmWithTagsProps.property.actionsEnabled"></a>

```typescript
public readonly actionsEnabled: boolean;
```

- *Type:* boolean
- *Default:* true

Whether the actions for this alarm are enabled.

---

##### `alarmDescription`<sup>Optional</sup> <a name="alarmDescription" id="cdk-constructs.AlarmWithTagsProps.property.alarmDescription"></a>

```typescript
public readonly alarmDescription: string;
```

- *Type:* string
- *Default:* No description

Description for the alarm.

---

##### `alarmName`<sup>Optional</sup> <a name="alarmName" id="cdk-constructs.AlarmWithTagsProps.property.alarmName"></a>

```typescript
public readonly alarmName: string;
```

- *Type:* string
- *Default:* Automatically generated name

Name of the alarm.

---

##### `comparisonOperator`<sup>Optional</sup> <a name="comparisonOperator" id="cdk-constructs.AlarmWithTagsProps.property.comparisonOperator"></a>

```typescript
public readonly comparisonOperator: ComparisonOperator;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.ComparisonOperator
- *Default:* GreaterThanOrEqualToThreshold

Comparison to use to check if metric is breaching.

---

##### `datapointsToAlarm`<sup>Optional</sup> <a name="datapointsToAlarm" id="cdk-constructs.AlarmWithTagsProps.property.datapointsToAlarm"></a>

```typescript
public readonly datapointsToAlarm: number;
```

- *Type:* number
- *Default:* ``evaluationPeriods``

The number of datapoints that must be breaching to trigger the alarm.

This is used only if you are setting an "M
out of N" alarm. In that case, this value is the M. For more information, see Evaluating an Alarm in the Amazon
CloudWatch User Guide.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html#alarm-evaluation)

---

##### `evaluateLowSampleCountPercentile`<sup>Optional</sup> <a name="evaluateLowSampleCountPercentile" id="cdk-constructs.AlarmWithTagsProps.property.evaluateLowSampleCountPercentile"></a>

```typescript
public readonly evaluateLowSampleCountPercentile: string;
```

- *Type:* string
- *Default:* Not configured.

Specifies whether to evaluate the data and potentially change the alarm state if there are too few data points to be statistically significant.

Used only for alarms that are based on percentiles.

---

##### `treatMissingData`<sup>Optional</sup> <a name="treatMissingData" id="cdk-constructs.AlarmWithTagsProps.property.treatMissingData"></a>

```typescript
public readonly treatMissingData: TreatMissingData;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.TreatMissingData
- *Default:* TreatMissingData.Missing

Sets how this alarm is to handle missing data points.

---

##### `metric`<sup>Required</sup> <a name="metric" id="cdk-constructs.AlarmWithTagsProps.property.metric"></a>

```typescript
public readonly metric: IMetric;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IMetric

The metric to add the alarm on.

Metric objects can be obtained from most resources, or you can construct
custom Metric objects by instantiating one.

---

##### `tags`<sup>Required</sup> <a name="tags" id="cdk-constructs.AlarmWithTagsProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---



