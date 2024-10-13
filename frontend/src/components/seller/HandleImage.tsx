/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloudinaryConfig } from "@/lib/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
// import { Cloudinary, Transformation } from "@cloudinary/url-gen";
// import {Transformation} from "@cloudinary/url-gen"

export function HandleImage({ uploadedImage }: any) {
  console.log(uploadedImage)
  const myImage = cloudinaryConfig.image(uploadedImage);
  return (
    <div className="border p-4 rounded-lg mt-10">
      <AdvancedImage cldImg={myImage} />
    </div>
  )
}
