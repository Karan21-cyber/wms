import Image from "next/image";
import Link from "next/link";

function SigupBanner() {
  return (
    <div className="signup-banner flex flex-col gap-12 justify-center items-center w-[425px] ">
      <Link
        href="/"
        className="
          w-full
          flex
          justify-center
          items-center"
      >
        <Image
          src={"/logo.png"}
          alt="space-world Logo"
          className=""
          width={150}
          height={50}
        />
      </Link>

      <Image
        width={420}
        height={350}
        alt="backgroundImage"
        src={"/signup/highlightImage.png"}
        className="background-image object-contain  "
      />

      <div className="flex flex-col gap-4 w-[380px]">
        <h1 className="signup-highlight text-2xl md:text-3xl font-bold -tracking-[0.5px] text-center text-white">
          Online Community For User To Work In File Don&#39;t
        </h1>

        <p className="signup-text text-base font-normal text-white text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididun.
        </p>
      </div>
    </div>
  );
}

export default SigupBanner;
