import * as AWS from 'aws-sdk';
import { Tag } from 'aws-sdk/clients/cloudwatch';
import * as response from 'cfn-response';
const cloudwatch = new AWS.CloudWatch();

export const handler = async (event: any, context: any) => {
  console.log(event);

  try {
    const tags: Tag[] = event.ResourceProperties.Tags;
    const arn = event.ResourceProperties.AlarmArn;

    if (!tags || !tags.length || !arn) {
      console.error('AlarmArn and Tags properties must be defined');
      await response.send(event, context, response.FAILED, {});
    }

    if (event.RequestType === 'Create') {
      // Create all tags on the custom resource
      await cloudwatch.tagResource({
        ResourceARN: arn,
        Tags: tags,
      }).promise();
    } else if (event.RequestType === 'Update') {
      // Remove tags that were present in the old resource properties, but are
      // no longer present
      const previousTags: Tag[] = event.OldResourceProperties.Tags;
      const currentTagKeys = tags.map(t => t.Key);

      const staleTags = previousTags.filter(p => !currentTagKeys.includes(p.Key));

      if (staleTags.length) {
        await cloudwatch.untagResource({
          ResourceARN: arn,
          TagKeys: staleTags.map(t => t.Key),
        }).promise();
      }

      // Create/update all values present in the current resource properties
      await cloudwatch.tagResource({
        ResourceARN: arn,
        Tags: tags,
      }).promise();
    } else if (event.RequestType === 'Delete') {
      // Remove all tags on the custom resource
      await cloudwatch.untagResource({
        ResourceARN: arn,
        TagKeys: tags.map(t => t.Key),
      }).promise();
    }

    await response.send(event, context, response.SUCCESS, {});
  } catch (error) {
    console.error(error);
    await response.send(event, context, response.FAILED, {});
  }
};
