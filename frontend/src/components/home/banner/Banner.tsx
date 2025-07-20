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
      { x: 0, opacity: 1, duration: 1 , delay:1 }
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
    <div className="max-w-screen px-[100px] overflow-hidden mx-auto lg:flex min-h-[800px] lg:items-center lg:gap-[40px] lg:justify-between">
      <div className="w-[50%] flex justify-center items-center banner-image">
       <Image
          className="h-[600px]"
          src={banner}
          alt="banner image"
          height={800}
        />
      </div>
      <div className="flex flex-col space-y-[50px] w-[50%] justify-center items-start">
        <h2 className="banner-h2 text-primary leading-[90px] text-[66px] font-bold">
          Share Hope, Share Life. <br /> Become a Blood Donor!
        </h2>
        <div className="banner-content text-[18px] font-semibold flex text-secondary flex-col gap-[8px]">
          <p className="leading-[40px]">
            Every year, millions of patients rely on blood donations for
            life-saving treatments.<br/> Your contribution can make a world of
            difference.
          </p>
        </div>
        <div className="flex gap-12 my-4 banner-cta">
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
