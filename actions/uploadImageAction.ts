"use server";
import * as S3 from "@/lib/services/S3";
export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file")
  const blob = new Blob([file!], { type: "video/quicktime" });

  const fileBuffer = await blob.arrayBuffer();

  const res = await S3.putFile("r.mov", fileBuffer, "video/quicktime")
}
