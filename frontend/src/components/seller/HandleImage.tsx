/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloudinaryConfig } from "@/lib/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
// import { Cloudinary, Transformation } from "@cloudinary/url-gen";
// import {Transformation} from "@cloudinary/url-gen"

export function HandleImage({
  uploadedImage,
  className,
}: {
  uploadedImage: string;
  className?: string;
}) {
  const myImage = cloudinaryConfig.image(uploadedImage);
  return (
    <div className={`border rounded-md relative overflow-hidden ${className}`}>
      <AdvancedImage cldImg={myImage} className="absolute object-cover" />
    </div>
  );
}
