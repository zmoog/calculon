import { Intent, IEC2Service, SlackMessage } from "dickbott";
import { inject, injectable } from "inversify";
import { find, map } from "lodash";
import { BasecampMessage } from "../basecamp/Types";


/**
 * aws ec2 describe-instances --filters Name=tag:Project,Values=tfm Name=tag:Environment,Values=dev-t1 Name=tag:Name,Values='tfm-*-bastion'
 */
@injectable()
export class SageMakerStopNotebookInstance implements Intent<Entities, BasecampMessage> {

    // name = "EC2 Describe Intent";
    // description = "Describe all existing EC2 instances for the given environment."
    // docs_url = "https://bitbucket.tierraservice.com/projects/BLIZ/repos/blizzard-dickbott/browse/service/docs/Ec2DescribeIntent.md"
    // examples = {
    //     Elegant: "Describe ec2 instance for dev environment"
    // }

    // constructor(@inject("EC2Service") private ec2Service: IEC2Service) {
    // }

    async execute(executionId: string, entities: Entities): Promise<BasecampMessage> {

        return "<h1>stocazzo</h1>";
        // let instances = await this.ec2Service.describeInstances({
        //     Filters: [
        //         { Name: "tag:Environment", Values: [entities.environment] }
        //     ]
        // });

        // let attachments = map(instances, i => ({
        //     author_name: find(i.Tags, { Key: "Environment" }).Value.toUpperCase() || "Unknown",
        //     color: "running" === i.State.Name ? "good" : "danger",
        //     fields: [
        //         {
        //             title: "Public DNS Name",
        //             value: i.PublicDnsName || "n/a",
        //             short: false
        //         },
        //         {
        //             title: "Public IP Address",
        //             value: i.PublicIpAddress || "n/a",
        //             short: true
        //         },
        //         {
        //             title: "Instance Type",
        //             value: i.InstanceType,
        //             short: true
        //         },
        //         {
        //             title: "Key Name",
        //             value: i.KeyName,
        //             short: true
        //         },
        //         {
        //             title: "State",
        //             value: i.State.Name,
        //             short: true
        //         },
        //         {
        //             title: "Instance Id",
        //             value: i.InstanceId,
        //             short: true
        //         }
        //     ]
        // }));

        // if (instances.length === 0) {
        //     return {
        //         text: `Hey, I cannot find any EC2 instance for the environment *${entities.environment}*.`
        //     }
        // }

        // return {
        //     text: "This is the status of the EC2 instances:",
        //     attachments: attachments
        // };
    }
}

export type Entities = {
    // environment: string
};