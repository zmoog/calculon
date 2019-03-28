import { SageMaker } from "aws-sdk";
import { injectable } from "inversify";


@injectable()
export class SageMakerService {

    private sageMaker = new SageMaker();

    // listObjectsV2(params: S3.Types.ListObjectsV2Request): Promise<S3.Types.ListObjectsV2Output> {
    //     return this.s3.listObjectsV2(params).promise();
    // }

    // async putObject(request: S3.Types.PutObjectRequest): Promise<S3.Types.PutObjectOutput> {
    //     return this.s3.putObject(request).promise();
    // }

    // async stocazzo(params: SageMaker.Types.ListNotebookInstancesInput) {

    /**
     * 
     * $ aws sagemaker list-notebook-instances --status-equals 'InService'
     * 
     */
    async listNotebookInstances(params: SageMaker.Types.ListNotebookInstancesInput): Promise<SageMaker.Types.ListNotebookInstancesOutput> {

        // let params: SageMaker.Types.ListNotebookInstancesInput = {
        //     StatusEquals: "InService"
        // }

        return this.sageMaker.listNotebookInstances(params).promise();

        // if (response.NotebookInstances.length ===0) {
        //     return "Cannot find any instance in the 'InService' state."
        // }
    }
}
