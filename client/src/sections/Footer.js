import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

const footerLinks = [
  { href: "#", label: "Contact" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms & Conditions" },
];

export default function Footer() {
  return (
    <footer className="py-10 px-4 flex items-center justify-center">
      <footer className="container flex flex-col md:flex-row md:justify-between items-center gap-6">
        <div className="flex flex-col gap-2 items-center text-center md:items-start">
          <div className="flex items-center">
            <Image src={logo} alt="Logo Icon" className="h-auto w-20" />
            <h2 className="font-bold text-2xl md:inline-flex hidden text-[#35ccbe]">
              AdversaNet
            </h2>
          </div>
          <small className="text-white/50">
            The source code is available on{" "}
            <Link href={"https://github.com/Niranjan1Praveen/NTCC-2025.git"} className="underline italic">
              GitHub.
            </Link>
          </small>
        </div>
        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              className="text-white/50 text-sm hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </footer>
  );
}
