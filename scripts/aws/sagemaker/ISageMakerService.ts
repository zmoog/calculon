import { SageMaker } from "aws-sdk";

export interface ISageMakerService {
    listNotebookInstances(params: SageMaker.Types.ListNotebookInstancesInput): Promise<SageMaker.Types.ListNotebookInstancesOutput>;
}