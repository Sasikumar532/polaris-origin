import Image from "next/image";
import logoDark from "@/po-logo-2.png";
import logoLight from "@/po-logo-1.png";

export default function Logo({ tone = "dark" }) {
  const src = tone === "light" ? logoLight : logoDark;
  return (
    <Image
      src={src}
      alt="Polaris Origin"
      data-testid="brand-logo"
      className="h-11 w-auto"
    />
  );
}
