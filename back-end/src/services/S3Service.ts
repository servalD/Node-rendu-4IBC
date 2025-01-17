import AWS from "aws-sdk";

export default class S3Service {
  private static s3service: S3Service;

  private s3bucket: AWS.S3 = new AWS.S3({
    endpoint: "http://localhost:9000",
    accessKeyId: "admin",
    secretAccessKey: "admin123",
    s3ForcePathStyle: true,
    signatureVersion: "v4",
  });

  public static getInstance() {
    if (!this.s3service) {
      this.s3service = new S3Service();
    }
    return this.s3service;
  }

  public async upload(
    key: string,
    fileContent: Buffer,
    mimeType: string,
    bucketName: string = "cours4a"
  ) {
    await this.s3bucket
      .upload({
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ContentType: mimeType,
      })
      .promise();

    console.log("File uploaded to S3 : ", key);
  }

  public async getUrl(key: string, bucketName: string = "cours4a") {
    const url = this.s3bucket.getSignedUrl("getObject", {
      Bucket: bucketName,
      Key: key,
      Expires: 60,
    });

    console.log("File URL : ", url);
    return url;
  }
}
