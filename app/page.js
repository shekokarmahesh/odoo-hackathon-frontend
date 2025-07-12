import "./globals.css";
import LandingPage from "../components/LandingPage";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div>
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>
      <LandingPage />
    </div>
  );
}
