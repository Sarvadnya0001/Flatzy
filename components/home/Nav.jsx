import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/option";


const Nav = async () => {
  const session = await getServerSession(options);

  const links = [
    // { href: "/", label: "Home" },
    // { href: "/createUser", label: "Create User" },
    // { href: "/clientMember", label: "Client Member" },
    // { href: "/member", label: "Member" },
    // { href: "/public", label: "Public" },
  ];

  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div className="text-xl font-bold">Flatzy</div>
        <div className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-sky-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {session ? (
            <Link href={"/api/auth/signout?callbackUrl=/"}>Logout</Link>
          ) : (
            <Link href={"/api/auth/signin"}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
