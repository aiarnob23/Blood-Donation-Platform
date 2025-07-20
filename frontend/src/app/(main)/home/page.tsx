import AboutUs from "@/components/home/about-us/About-Us";
import Banner from "@/components/home/banner/Banner";
import FAQ from "@/components/home/faq/Faq";

export default function Home() {
  return (
      <div>
        <div className="mx-auto">
        <Banner />
        <AboutUs />
        <FAQ/>
        </div>
      </div>
  );
}