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
            <p className="text-2xl font-bold text-white/20 text-center leading-relaxed md:inline-flex hidden">
                <span className="bg-gradient-to-r from-[#3EDFA3] via-[#30F6F0] to-[#5EF7BA] bg-clip-text">
                  MediScribe
                </span>
              </p>
          </div>
          <small>
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
              className="text-sm hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </footer>
    </footer>
  );
}
