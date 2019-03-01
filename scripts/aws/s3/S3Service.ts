import { S3 } from "aws-sdk";
import { IS3Service } from "./IS3Service";


export class S3Service implements IS3Service {

    private s3 = new S3();

    // listObjectsV2(params: S3.Types.ListObjectsV2Request): Promise<S3.Types.ListObjectsV2Output> {
    //     return this.s3.listObjectsV2(params).promise();
    // }

    async putObject(request: S3.Types.PutObjectRequest): Promise<S3.Types.PutObjectOutput> {
        return this.s3.putObject(request).promise();
    }
}
