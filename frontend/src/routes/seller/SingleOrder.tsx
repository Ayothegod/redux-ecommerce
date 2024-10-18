import { useLoaderData } from "react-router-dom";

export function SingleOrder() {
  // const { toast } = useToast();
  // const navigate = useNavigate();
  const id: string | undefined = useLoaderData() as string | undefined;
  //   const { data: order } = useGetOrderByIdQuery(id as string);
  // console.log(JSON.stringify(order, null, 2));

  return (
    <>
      <div className="border border-white bg-white shadow-sm w-full p-3 rounded-md flex-1 mb-20">
        <h2 className="font-semibold text-lg">Order</h2>
        <div>{id}</div>

        <div></div>
      </div>
    </>
  );
}
