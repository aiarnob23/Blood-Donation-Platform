import Image from "next/image";
import banner from "../../../public/images/banner/banner1.jpg";

export default function Banner() {
  return (
    <div className="lg:flex lg:justify-between lg:gap-4 mt-[50px]">
      <div>
        <Image src={banner} alt="banner image" height={800} width={800} />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-primary leading-[58px] text-5xl font-bold">
          Share Hope, Share Life. <br/> Become a Blood Donor!
        </h2>
        <div className="text-[18px] mt-3 font-semibold flex text-secondary flex-col gap-[8px]">
          <p>
            Every year, millions of patients rely on blood donations for
            life-saving treatments. Your contribution can make a world of
            difference.
          </p>
          <p>
            Inspire others to donate by sharing your story. Together, we can
            build a culture of giving and caring.
          </p>
        </div>
        <div className="flex gap-4 my-4">
          <button className="btn btn-ghost primary-btn">Donate Blood</button>
          <button className="btn btn-ghost primary-btn">Request Blood</button>
        </div>
      </div>
    </div>
  );
}
