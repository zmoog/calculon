import { inject, injectable } from "inversify";
import { Intent, SlackMessage, IEC2Service } from "dickbott";
import { map } from "lodash";


@injectable()
export class Ec2StopIntent implements Intent<Ec2StopEntities, SlackMessage> {

    name = "EC2 Stop Intent";
    description = "Stop all running EC2 instances with the `AutoShutDown` tag value `on`."
    docs_url = "https://bitbucket.tierraservice.com/projects/BLIZ/repos/blizzard-dickbott/browse/service/docs/Ec2StopIntent.md"
    examples = {
        Elegant: "Stop ec2 instance for dev environment"
    }

    constructor(
        @inject("EC2Service") private ec2Service: IEC2Service
    ) { }

    async execute(executionId: string, entities: Ec2StopEntities): Promise<SlackMessage> {

        let instances = await this.ec2Service.describeInstances({
            Filters: [
                { Name: "tag:Environment", Values: [entities.environment] },
                { Name: "instance-state-name", Values: ["running"] },
                { Name: "tag:AutoShutDown", Values: ["on"] }
            ]
        });

        console.log("ec2 instances: %j", instances);

        if (instances.length === 0) {
            return {
                text: `Hey, I cannot find any EC2 instances elegible for shut down for the project *${entities.environment}*.`
            }
        }

        await this.ec2Service.stopInstances({
            InstanceIds: map(instances, instance => instance.InstanceId),
            DryRun: false
        });

        return {
            text: `Hey, I'm stopping ${instances.length} EC2 instances!`
        }
    }

}

export type Ec2StopEntities = {
    environment: string
}
