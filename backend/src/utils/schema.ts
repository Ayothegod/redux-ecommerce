import { z } from "zod";

const AccountType = z.enum(["SHOPPER", "SELLER", "ADMIN"], {
  message: "it can only be SELLER or SHOPPER",
});

export const registrationSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3, { message: "First Name must be at least 3 characters long" })
    .max(50, { message: "First Name must be at most 50 characters long" }),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(3, { message: "Last Name must be at least 3 characters long" })
    .max(50, { message: "Last Name must be at most 50 characters long" }),
  accountType: AccountType,
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(225, { message: "Password must be at most 225 characters long" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(225, { message: "Password must be at most 225 characters long" }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z.object({
  otp: z
    .string({ required_error: "OTPs required" })
    .min(6, { message: "OTP cannot be less than 6 digits" })
    .max(6, { message: "OTP cannot be more than 6 digits." }),
  newPassword: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "New password must be at least 8 characters long" }),
});

const CategoryType = z.enum(["TABLE", "CHAIR", "COVER"], {
  message: "it can only be SELLER or SHOPPER",
});

export const productSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .min(3, { message: "Product name must be at least 3 characters long" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(3, { message: "Description must be at least 3 characters long" }),
  // imageUrl: z.string(),
  price: z.coerce
    .number({ required_error: "Price is required" })
    .min(1, "Enter the price for this product"),
  category: CategoryType,
  // tags: z.array(z.string()),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.coerce.number().optional(),
  category: CategoryType,
  tags: z.array(z.string()).optional(),
  sellerId: z
    .string({ required_error: "sellerId is required" })
    .min(3, { message: "sellerId must be at least 3 characters long" }),
});

const OrderItemStatus = z.enum(
  ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
  {
    message: "it can only be PENDING, SHIPPED, DELIVERED or CANCELLED",
  }
);

export const orderItem = z.object({
  orderId: z.string().optional(),
  productId: z.string(),
  sellerId: z.string(),
  quantity: z.string(),
  price: z.string(),
  status: OrderItemStatus,
});

export type OrderItem = z.infer<typeof orderItem>;

// const [file, setFile] = useState("");
// const [image, setImage] = useState<any>("");
// const [uploadedImage, setUploadedImage] = useState("");

// function previewFiles(file: any) {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);

//   reader.onloadend = () => {
//     setImage(reader.result);
//   };
// }

// const handleFormChange = (e: any) => {
//   const file = e.target.files[0];
//   setFile(file);
//   previewFiles(file);
// };

// const onSubmit = async (e: any) => {
//   e.preventDefault();
//   const result = await axios.post(
//     "http://localhost:3000/api/v1/products/product",
//     {
//       image: image,
//     }
//   );
//   try {
//     console.log(result.data.data.uploadResult.public_id);
//     const uploadedImage = result.data.data.uploadResult.public_id;
//     setUploadedImage(uploadedImage);
//   } catch (error) {
//     console.log(error);
//   }
// };
