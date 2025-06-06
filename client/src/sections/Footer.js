import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import facebook from "@/assets/images/facebook.svg"
import x from "@/assets/images/x.svg"
import github from "@/assets/images/github.svg"

const footerLinks = [
  { href: "#", label: "Contact" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms & Conditions" },
];

export default function Footer() {
  return (
    <footer className="py-10 px-4 flex items-center justify-center">
      <footer className="container flex flex-col md:flex-row md:justify-between items-center gap-6 border-t-2 border-white pt-6">
        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              className="text-sm hover:underline text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-wrap gap-6 justify-end">
          <Link href={"#"}>
            <Image src={facebook} width={30} height={30} alt="Social Icon"/>
          </Link>
          <Link href={"#"}>
            <Image src={x} width={30} height={30} alt="Social Icon"/>
          </Link>
          <Link href={"#"}>
            <Image src={github} width={30} height={30} alt="Social Icon"/>
          </Link>
        </div>
      </footer>
    </footer>
  );
}
