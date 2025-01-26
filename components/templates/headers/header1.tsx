"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag } from "lucide-react";
import { widthForImage, heightForImage } from "@/lib/builtjs-utils";
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";

export default function Header1({ content }: any) {
  const [isOpen, setIsOpen] = useState(false);
  if (!content) return <></>;
  const { collections = {}, global = {} } = { ...content };
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();

  const NavItems = () => (
    <>
      {collections["primaryMenuItem"] &&
        collections["primaryMenuItem"].map((link: any, i: number) => (
          <div key={i}>
            {pathname === link.url ? (
              <Link
                className="text-lg font-semibold text-primary"
                href={link.url}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                href={link.url}
                className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )}
          </div>
        ))}
    </>
  );

  return (
    <header className="border-b">
      <div className="flex items-center justify-between max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl">
        <Link className="flex items-center pr-10 mr-auto" href="/">
          <span className="relative w-10">
            <Image
              src={global?.logo.url}
              width={widthForImage(global?.logo)}
              height={heightForImage(global?.logo)}
              style={{ objectFit: "cover" }}
              alt="logo"
            />
          </span>
          <span className="ml-3 text-xl font-bold text-black uppercase dark:text-white">
            {global.name}
          </span>
        </Link>

        <nav className="hidden gap-12 mr-20 lg:flex 2xl:ml-16">
          <NavItems />
        </nav>

        <div className="flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex border-r divide-x sm:border-l">
            <Button
              variant="outline"
              onClick={() => handleCartClick()}
              className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
            >
              <ShoppingBag />
              <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                Cart
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}