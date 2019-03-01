import { inject, injectable, interfaces } from "inversify";
import { Intent, SlackMessage, IJenkinsService, JenkinsService, Attachment, IEC2Service } from "dickbott";
import { map } from "lodash";


@injectable()
export class Ec2StartIntent implements Intent<Ec2StartEntities, SlackMessage> {

    name = "EC2 Start Intent";
    description = "Start all stopped EC2 instances with the `AutoStartUp` tag value `on`."
    docs_url = "https://bitbucket.tierraservice.com/projects/BLIZ/repos/blizzard-dickbott/browse/service/docs/Ec2StartIntent.md"
    examples = {
        Elegant: "Start ec2 instance for dev environment"
    }

    constructor(
        @inject("EC2Service") private ec2Service: IEC2Service
    ) { }

    async execute(executionId: string, entities: Ec2StartEntities): Promise<SlackMessage> {

        let instances = await this.ec2Service.describeInstances({
            Filters: [
                { Name: "tag:Environment", Values: [entities.environment] },
                { Name: "instance-state-name", Values: ["stopped"] },
                { Name: "tag:AutoStartUp", Values: ["on"] }
            ]
        });

        console.log("ec2 instances: %j", instances);

        if (instances.length === 0) {
            return {
                text: `Hey, I cannot find any EC2 instances elegible for startup for the environment *${entities.environment}*.`
            }
        }

        await this.ec2Service.startInstances({
            InstanceIds: map(instances, instance => instance.InstanceId),
            DryRun: false
        });

        return {
            text: `Hey, I'm starting ${instances.length} EC2 instances!`
        }
    }

}

export type Ec2StartEntities = {
    environment: string
}
