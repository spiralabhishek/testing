import fs from "fs";
import * as AWS from "aws-sdk";

const webp = require("webp-converter");

const options: any = {
  secretAccessKey: process.env.S3_SECRET as string,
  accessKeyId: process.env.S3_ACCESS_KEY as string,
  region: process.env.S3_REGION as string,
  endpoint: process.env.S3_ENDPOINT as string,
};

export class FileUpload {
  private static s3: AWS.S3;

  public static async upload(
    file: any,
    isWebp: boolean = false,
    folder: string = ""
  ) {
    AWS.config.update(options);
    this.s3 = new AWS.S3();

    let params: any;
    let newName: string;
    try {
      if (isWebp) {
        newName = Date.now() + ".webp";
        await webp.cwebp(file.path, `temp/${newName}`, "-q 80");
        params = {
          ACL: "public-read",
          ContentType: "webp",
          Bucket: process.env.S3_NAME,
          Body: fs.createReadStream(`temp/${newName}`),
          Key: folder ? `${folder}/${newName}` : `${newName}`,
        };
      } else {
        const originalname = file.name;
        const splitName = originalname.split(".");

        newName = Date.now() + ".jpg";

        params = {
          ACL: "public-read",
          ContentType: "jpg",
          Bucket: process.env.S3_NAME,
          Body: fs.createReadStream(file.path),
          Key: folder ? `${folder}/${newName}` : `${newName}`,
        };
      }
      const uploadResult = await this.s3.upload(params).promise();
    } catch (err) {
      newName = "";
      console.error(`Error: ${err}`);
    }

    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    } else {
      console.log(`File does not exist: ${file.path}`);
    }

    if (isWebp && newName) {
      fs.unlinkSync(`temp/${newName}`);
    }

    return newName;
  }

  public static async delete(fileName: string) {
    AWS.config.update(options);

    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.S3_NAME as string,
      Key: fileName,
    };

    try {
      await s3.deleteObject(params).promise();
      return true;
    } catch (err) {
      console.error(`Error deleting file from S3. Details: ${err}`);
      return false;
    }
  }

  public static async moveFile(
    imageName: string,
    sourceFolder: string,
    destinationFolder: string
  ) {
    AWS.config.update(options);
    const s3 = new AWS.S3();

    const sourceKey = `${sourceFolder}/${imageName}`;
    const destinationKey = `${destinationFolder}/${imageName}`;

    try {
      // Check if the source file exists
      const sourceFileExists = await s3
        .headObject({ Bucket: process.env.S3_NAME as string, Key: sourceKey })
        .promise();
      if (!sourceFileExists) {
        console.log(`Source file ${sourceKey} does not exist in the bucket.`);
        return false;
      }

      const params: AWS.S3.CopyObjectRequest = {
        Bucket: process.env.S3_NAME as string,
        CopySource: encodeURIComponent(`/${process.env.S3_NAME}/${sourceKey}`),
        Key: destinationKey,
      };

      await s3.copyObject(params).promise();
      await s3
        .deleteObject({ Bucket: process.env.S3_NAME as string, Key: sourceKey })
        .promise();
      console.log("file moved successfully", sourceKey, destinationKey);
      return true;
    } catch (err) {
      console.error(`Error moving file in S3. Details: ${err}`);
      return false;
    }
  }
}



// https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/scenarios/multipart-upload.js