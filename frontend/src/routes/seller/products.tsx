/* eslint-disable @typescript-eslint/no-explicit-any */
import { HandleImage } from "@/components/seller/HandleImage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";

export function SellerProducts() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState<any>("");
  const [uploadedImage, setUploadedImage] = useState("");

  function previewFiles(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
      // console.log("readers-umage:", reader.result);
    };
  }

  const handleFormChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result = await axios.post(
      "http://localhost:3000/api/v1/products/product",
      {
        image: image,
      }
    );
    try {
      console.log(result.data.data.uploadResult.public_id);
      const uploadedImage = result.data.data.uploadResult.public_id;
      setUploadedImage(uploadedImage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1">
      Hello
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <Label>Upload your photo here</Label>
            <input
              type="file"
              name=""
              id="fileInput"
              required
              placeholder="Handle file"
              accept="image/png, image.jpeg, image.jpg, image.jiff"
              onChange={(e) => handleFormChange(e)}
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
      <div className="border p-4">
        <img src={image} alt="" />
        <HandleImage uploadedImage={uploadedImage}/>
      </div>
    </div>
  );
}
