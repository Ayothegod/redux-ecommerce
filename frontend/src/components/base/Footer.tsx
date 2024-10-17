import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Copyright } from "lucide-react";

const aboutData = [
  { id: 1, title: "Our Company", url: "/about" },
  { id: 2, title: "Blog", url: "/blog" },
];

const informationData = [
  { id: 1, title: "Delivery Inormation", url: "/about" },
  { id: 2, title: "Privacy Policy", url: "/blog" },
  { id: 3, title: "Terms and Condition", url: "/blog" },
  { id: 4, title: "Return", url: "/blog" },
];

const supportData = [
  { id: 1, title: "Contact Us", url: "/about" },
  { id: 2, title: "FAQ", url: "#faq" },
  { id: 3, title: "Checkout", url: "/cart/checkout" },
];

export function Footer() {
  return (
    <div className="py-2 ">
      <div className="border-y flex items-center justify-center py-4">
        <Logo className="text-4xl text-black" />
      </div>
      <div className="body grid grid-cols-1 md:grid-cols-3 py-8 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">About</h3>
          <ul className="flex flex-col gap-2">
            {aboutData.map((data) => (
              <Link to={data.url} key={data.id} className="hover:underline">
                <li>{data.title}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Information</h3>
          <ul className="flex flex-col gap-2">
            {informationData.map((data) => (
              <Link to={data.url} key={data.id} className="hover:underline">
                <li>{data.title}</li>
              </Link>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="flex flex-col gap-2">
            {supportData.map((data) => (
              <Link to={data.url} key={data.id} className="hover:underline">
                <li>{data.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm gap-2 text-black/70 body">
        <div className="flex items-center gap-2">
          <Copyright />
          2024
        </div>
        <div>
          <p>Property of company - All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
