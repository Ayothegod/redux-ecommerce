/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { HandleImage } from "@/components/seller/HandleImage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, XCircle } from "lucide-react";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "@/lib/schema";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProductMutation } from "@/services/products/productSlice";

type ProductSchemaType = z.infer<typeof productSchema>;

export function SellerCreateProduct() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchemaType>({ resolver: zodResolver(productSchema) });

  const [file, setFile] = useState("");
  const [image, setImage] = useState<any>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<any>();
  // console.log(tags);

  const setTagValue = (e: any) => {
    const tagValue = e.target.value;
    setTag(tagValue.toLowerCase());
  };

  const addTags = () => {
    setTags((prev: any) => [...prev, tag]);
    setTag("");
  };

  const removeTag = (idx: number) => {
    setTags(tags.filter((tag, id) => id !== idx));
  };

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

  const onSubmit = async (data: ProductSchemaType) => {
    if (!image) {
      toast({
        variant: "destructive",
        description: `Please add a product image`,
      });
      return;
    }
    const body = { ...data, image, tags };
    console.log(body);

    try {
      const response = await createProduct(body).unwrap();
      console.log({ response });

      toast({
        title: `Product created successfully`,
      });
      return navigate("/seller/products");
    } catch (error: any) {
      console.log({ error });

      if (error.data) {
        return toast({
          variant: "destructive",
          description: `${error.data.message}`,
        });
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        return null;
      }
    }
  };

  return (
    <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1 mb-10">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Add Product</h2>
        <Link to="/seller/products">
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row md:ite w-full gap-2 md:gap-4 my-4">
          <div className="border p-2 rounded-md md:w-1/2 flex flex-col gap-4">
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
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <Upload className="h-10 w-10" />
                      <p className="text-center">Your image preview here</p>
                    </div>
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
              <div className="flex items-center flex-col md:flex-row gap-2">
                <Input
                  type="text"
                  placeholder="table chair cover etc"
                  value={tag}
                  onChange={setTagValue}
                />
                <Button className="" type="button" onClick={addTags}>
                  Add Tag
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="border rounded-md p-2 flex  gap-2 flex-wrap">
                  {tags.map((tag: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-1 text-sm bg-blue-600 text-white rounded font-medium flex items-center gap-2"
                    >
                      {tag}{" "}
                      <XCircle
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => removeTag(idx)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border p-2 rounded-md md:w-1/2 flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium">Product Name</label>
              <Input
                type="text"
                placeholder="Urban Family Center Table"
                // required
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
                // required
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
                // required
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
                // required
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

        <div className="flex justify-end my-10">
          <Button type="submit" className="w-full md:w-max">
            {isLoading ? <Loader2 className="animate-spin" /> : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
