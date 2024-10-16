/* eslint-disable @typescript-eslint/no-explicit-any */
export function Logo({ className }: any) {
  return (
    <div
      className={`text-2xl font-bold font-space-grotesk ${
        className ? className : "text-white "
      }`}
    >
      Logo
    </div>
  );
}
