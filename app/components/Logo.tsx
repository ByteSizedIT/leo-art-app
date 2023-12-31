"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

import LogoImage from "./pencil-logo-cropped.png";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      className="mr-auto cursor-pointer"
      src={LogoImage}
      alt="Ninja logo"
      width="100"
      // width="85"
      quality={100}
      placeholder="blur"
      onClick={() => router.push("/")}
    />
  );
};
export default Logo;
