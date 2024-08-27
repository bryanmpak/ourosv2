import { config } from "dotenv";
config();

import { S3Client } from "@aws-sdk/client-s3";

let s3Config: {
  region: string;
  credentials?: { accessKeyId: string; secretAccessKey: string };
} = {
  region: process.env.AWS_REGION || "ap-southeast-2",
};

// If running on AWS (e.g., Lambda, ECS), the SDK will automatically use the IAM role
// For local development or non-AWS deployments, use environment variables
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  s3Config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

const s3 = new S3Client(s3Config);

export default s3;
