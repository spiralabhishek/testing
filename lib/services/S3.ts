import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { StreamingBlobPayloadInputTypes } from "@smithy/types";

export type S3Image = {
  size: string;
  name: string;
  lastModified: string;
  mimeType: string;
};

const getClient = () => {
  let client = new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET!,
    },
  });
  return client;
};

// EXAMPLE
//     `previews/${hashedId}.jpeg`,
//     PreviewImageBuffer,
//     'image/jpeg'

//key means path, for example  galley/test.png
const c: StreamingBlobPayloadInputTypes = ""
export const putFile = async (
  key: string,
  fileContent: any,
  contentType: string
) => {
  const params:PutObjectCommandInput = {
    Bucket: process.env.S3_NAME,
    Key: key,
    Body: fileContent,
    ContentType: contentType, //mime type
    ACL: "public-read",
  };
  const s3client = getClient();

console.log(params)
  return await s3client.send(new PutObjectCommand(params));
};

export const getFile = async (key: string) => {
  const s3client = getClient();
  const response = await s3client.send(
    new GetObjectCommand({
      Key: key,
      Bucket: process.env.S3_NAME,
    })
  );
  const stream: any = response.Body;

  if (stream) {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk: any) => chunks.push(chunk));
      stream.once("end", () => resolve(Buffer.concat(chunks)));
      stream.once("error", reject);
    });
  } else {
    throw new Error("Stream is null");
  }
};

export const listObjectPaginated = async (
  bucket: string,
  prefix?: string,
  startAfter?: string,
  // How many items will be loaded to client each fetch request
  maxItems: number = 5
) => {
  const listParams = {
    Bucket: bucket,
    Prefix: prefix,
    StartAfter: startAfter,
    // DO NOT TOUCH THIS
    MaxKeys: 1,
  } as ListObjectsV2CommandInput;

  const s3client = getClient();

  const command = new ListObjectsV2Command(listParams);

  try {
    let isTruncated = true;
    let contents: any = [];
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await s3client.send(command);

      Contents?.forEach((file: any) => {
        if (file.Size !== 0) {
          contents.push({
            size: file.Size,
            name: file.Key,
            lastModified: file.LastModified,
            mimeType: `image/${file.Key?.split(".")[1]}`,
          });
        }
      });

      if (contents.length >= maxItems) break;

      isTruncated = IsTruncated || false;

      command.input.ContinuationToken = NextContinuationToken;
    }

    return contents;
  } catch (err) {
    console.error(err);
  }
};

export const listObjects = async (bucket: string, prefix?: string) => {
  const listParams = {
    Bucket: bucket,
    Prefix: prefix,
  } as any;

  const s3client = getClient();
  let isTruncated = true;
  let marker: any;
  let s3Objects: any = [];

  // keep query aws while the response truncated to 1000 objects
  while (isTruncated) {
    if (marker) listParams.Marker = marker;

    isTruncated = false;
    const response = await s3client.send(new ListObjectsCommand(listParams));
    if (response && response.Contents) {
      response.Contents.forEach((file: any) => {
        let fragments = file.Key.split("/");
        let shortFileName = fragments[fragments.length - 1];
        let split = shortFileName.split(".");
        let owner_type = split[0];

        let nameParts = shortFileName.split(".");
        let mime_type = "image/" + nameParts[nameParts.length - 1];
        let size = file.Size;
        if (size != 0) {
          s3Objects.push({
            display_name: shortFileName,
            owner_type,
            mime_type,
            key: file.Key,
            last_modified: file.LastModified,
            size,
          });
        }
      });

      isTruncated = response.IsTruncated || false;
      if (isTruncated) {
        marker = response.Contents.slice(-1)[0].Key;
      }
    }
  }

  return s3Objects;
};
