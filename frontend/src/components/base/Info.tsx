import { BadgeHelp, CarFront, Repeat, ShoppingBag } from "lucide-react";

const infoData = [
  { id: 1, title: "Fast & Free Shipping", icon: CarFront },
  { id: 2, title: "Easy to Shop", icon: ShoppingBag },
  { id: 1, title: "24/7 Support", icon: BadgeHelp },
  { id: 1, title: "Hassle Free Returns", icon: Repeat },
];

export function Info() {
  return (
    <div className="body grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-8 gap-4 ">
      {infoData.map((info) => (
        <div key={info.id} className="flex flex-col p-4 gap-2">
          <aside className="bg-baseAccent w-max p-3 rounded-full">
            <info.icon />
          </aside>
          <p className="font-semibold lg:text-lg">{info.title}</p>
        </div>
      ))}
    </div>
  );
}
