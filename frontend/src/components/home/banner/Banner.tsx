"use client";
import Image from "next/image";
import banner from "../../../../public/images/banner/banner.jpg";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import gsap from "gsap";

export default function Banner() {
  // animation
  const { contextSafe } = useGSAP();

  useEffect(() => {
    bannerAnimations();
  }, []);

  const bannerAnimations = contextSafe(function () {
    gsap.fromTo(
      ".banner-image",
      {
        x: 1200,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      ".banner-h2",
      { x: 600, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 1 }
    );
    gsap.fromTo(
      ".banner-content",
      { x: 600, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 1.5 }
    );
    gsap.fromTo(
      ".banner-cta",
      { x: 600, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 1.75 }
    );
  });
  // return body
  return (
    <div className="max-w-screen px-[20px] xl:px-[100px] overflow-hidden mx-auto flex-col xl:flex-row gap-[40px] flex xl:min-h-dvh xl:items-center xl:gap-[40px] xl:justify-between">
      <div className="xl:w-[50%] relative h-full flex justify-center items-center banner-image">
        <Image
          className="xl:h-[600px] xl:absolute xl:-bottom-[240px]"
          src={banner}
          alt="banner image"
        />
      </div>
      <div className="flex flex-col space-y-[20px] xl:space-y-[50px] xl:w-[50%] justify-center items-center xl:items-start">
        <h2 className="banner-h2 text-primary xl:leading-[90px] text-[34px] md:text-[56px] xl:text-[76px] font-bold">
          Share Hope, Share Life. <br /> Become a Blood Donor!
        </h2>
        <div className="banner-content text-[16px] xl:text-[22px] font-semibold flex text-secondary flex-col gap-[8px]">
          <p className="leading-[40px]">
            Every year, millions of patients rely on blood donations for
            life-saving treatments.
            <br /> Your contribution can make a world of difference.
          </p>
        </div>
        <div className="flex gap-[30px] xl:gap-12 my-4 banner-cta">
          <Link href="/donate" className="btn btn-ghost primary-btn">
            Donate Blood
          </Link>
          <Link href="/request" className="btn btn-ghost primary-btn">
            Request Blood
          </Link>
        </div>
      </div>
    </div>
  );
}
