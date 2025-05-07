import {
  CreditCard,
  Wallet,
  ShieldCheck,
  Smartphone,
  PiggyBank,
  Coins,
} from "lucide-react";

const reasons = [
  {
    title: "Secure Online Banking",
    description:
      "Access your account anytime, anywhere with our secure online banking platform.",
    icon: <ShieldCheck className="size-6" />,
  },
  {
    title: "Easy Fund Transfers",
    description:
      "Transfer money quickly and safely between accounts or to other banks.",
    icon: <Coins className="size-6" />,
  },
  {
    title: "Card Management",
    description:
      "Activate, block, and manage your debit and credit cards with ease.",
    icon: <CreditCard className="size-6" />,
  },
  {
    title: "Mobile Banking",
    description:
      "Stay connected with our intuitive mobile app, designed for your convenience.",
    icon: <Smartphone className="size-6" />,
  },
  {
    title: "Savings Accounts",
    description:
      "Open and manage savings accounts with attractive interest rates.",
    icon: <PiggyBank className="size-6" />,
  },
  {
    title: "Wallet Integration",
    description:
      "Seamlessly link your digital wallets for easier transactions and payments.",
    icon: <Wallet className="size-6" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="pb-32 px-4 lg:px-6">
      <div className="mb-10 md:mb-20">
        <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
          Why Choose Our Bank?
        </h2>
      </div>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, i) => (
          <div key={i} className="flex flex-col">
            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
              {reason.icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
            <p className="text-muted-foreground">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
