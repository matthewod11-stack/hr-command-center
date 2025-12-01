import {
  Header,
  Hero,
  HowItWorks,
  BuiltFor,
  Security,
  FAQ,
  Pricing,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <BuiltFor />
        <Pricing />
        <Security />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
