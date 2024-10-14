/* eslint-disable @typescript-eslint/no-explicit-any */
import { HandleImage } from "@/components/seller/HandleImage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2, StepBack } from "lucide-react";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "@/lib/schema";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLoginMutation } from "@/services/auth/authSlice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ProductSchemaType = z.infer<typeof productSchema>;

export function SellerCreateProduct() {
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchemaType>({ resolver: zodResolver(productSchema) });

  const [file, setFile] = useState("");
  const [image, setImage] = useState<any>("");
  const [uploadedImage, setUploadedImage] = useState("");

  const fileInputRef: any = useRef(null);
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  function previewFiles(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setFile(file);
      previewFiles(file);
    } else {
      console.log("you have not selected a file");
    }
  };

  const uploadImage = async (e: any) => {
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

  const onSubmit = async (data: ProductSchemaType) => {
    console.log(data);

    // try {
    //   const response = await login(data).unwrap();
    //   console.log(response);

    //   toast({
    //     title: `Welcome back, ${response.data.userRes.accountType}`,
    //     description: ``,
    //   });

    //   if (response.data.userRes.accountType === "SELLER") {
    //     return navigate("/seller/dashboard");
    //   }
    //   return navigate("/");
    // } catch (error: any) {
    //   console.log({ error });

    //   if (error.data) {
    //     toast({
    //       variant: "destructive",
    //       description: `${error.data.message}`,
    //     });
    //     return;
    //   }

    //   if (error) {
    //     toast({
    //       variant: "destructive",
    //       title: "Uh oh! Something went wrong.",
    //       description: "There was a problem with your request.",
    //     });
    //     return null;
    //   }
    // }
  };

  return (
    <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1 mb-10">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Add Product</h2>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 my-4">
          <div className="border p-2 rounded-md w-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium">Product Image</label>
              <div className="flex flex-col items-center justify-center p-2 ">
                <button
                  type="button"
                  className="text-blue-600 underline cursor-pointer"
                  onClick={handleFileClick}
                >
                  Click here to upload an image
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                <div className="border-2 rounded-md h-48 border-dotted p-2 w-full">
                  {!image && (
                    <p className="text-center">Your image preview here</p>
                  )}

                  {image && (
                    <img
                      src={image}
                      alt="selected image"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium">Tags</label>
              <Input
                type="text"
                placeholder="Table"
                required
                {...register("category")}
              />
              {errors.category && (
                <Label className="text-xs text-red-500">
                  {errors.category?.message}
                </Label>
              )}
            </div>
          </div>

          <div className="border p-2 rounded-md w-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium">Product Name</label>
              <Input
                type="text"
                placeholder="Urban Family Center Table"
                required
                {...register("name")}
              />
              {errors.name && (
                <Label className="text-xs text-red-500">
                  {errors.name?.message}
                </Label>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium">Category</label>
              <Input
                type="text"
                placeholder="Table"
                required
                {...register("category")}
              />
              {errors.category && (
                <Label className="text-xs text-red-500">
                  {errors.category?.message}
                </Label>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium">Price</label>
              <Input
                type="number"
                placeholder="$140"
                required
                {...register("price")}
              />
              {errors.price && (
                <Label className="text-xs text-red-500">
                  {errors.price?.message}
                </Label>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Very long product description..."
                className="h-32 resize-none"
                required
                {...register("description")}
              />
              {errors.description && (
                <Label className="text-xs text-red-500">
                  {errors.description?.message}
                </Label>
              )}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full my-10">
          {isLoading ? <Loader2 className="animate-spin" /> : "Add Product"}
        </Button>
      </form>
      {/* <div>
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
        <div className="border p-4">
          <img src={image} alt="" />
          <HandleImage uploadedImage={uploadedImage} />
        </div>
      </div> */}
    </div>
  );
}
