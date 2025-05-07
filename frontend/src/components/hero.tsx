import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="hero" className="py-32 px-4 lg:px-6">
      <div className="text-center">
        <h1 className="mx-auto mb-3 mt-4 max-w-3xl text-balance text-4xl font-semibold lg:mb-7 lg:text-7xl">
          Your Trusted Partner in Banking
        </h1>
        <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
          At Jay Bank, we provide reliable financial solutions to help you save,
          grow, and manage your money with ease. Experience seamless banking
          today.
        </p>
        <Link
          className={cn(
            "mt-8",
            buttonVariants({
              variant: "default",
              size: "lg",
            })
          )}
          href="/register"
        >
          Open a bank account now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
