import Image from "next/image";
import Link from "next/link";

function SigupBanner() {
  return (
    <div className="signup-banner flex flex-col gap-12 justify-center items-center w-[425px] ">
      {/* <Image
        width={220}
        height={60}
        alt="backgroundImage"
        src={"/signup/logo.png"}
        className="background-image object-contain pb-12 "
      /> */}
      <Link
        href="/"
        className="
          w-full
          flex
          justify-center
          items-center"
      >
        <Image src={""} alt="space-world Logo" width={50} height={50} />
        <span
          className="font-semibold
          text-white text-4xl first-letter:ml-2"
        >
          space-world.
        </span>
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
          Online Community For User To Work In FileDon&#39;t
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
