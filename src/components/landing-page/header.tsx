"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const routes = [
  { title: "Features", href: "#features" },
  { title: "Reasources", href: "#resources" },
  { title: "Pricing", href: "#pricing" },
  { title: "Testimonials", href: "#testimonial" },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = () => {
  return (
    <header
      className="px-4
      py-[2px]
      md:px-6
      flex
      justify-center
      items-center
  "
    >
      <Link
        href={"/"}
        className="w-full flex gap-2
        justify-left items-center"
      >
        <Image
          src={"/logo.png"}
          alt="space-world Logo"
          className="cursor-pointer"
          width={120}
          height={50}
        />
      </Link>

      <aside
        className="flex
        w-full
        gap-1
        md:gap-2
        justify-end

      "
      >
        <Link href={"/login"}>
          <Button
            variant="btn-secondary"
            className="p-1 whitespace-nowrap min-w-[60px] font-bold text-xs md:text-base md:px-4 border border-violet-500 text-violet-500 hover:bg-violet-600 hover:text-white"
          >
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            variant="btn-primary"
            className="whitespace-nowrap font-bold text-xs md:text-base bg-violet-500 text-white hover:bg-violet-600"
          >
            Sign Up
          </Button>
        </Link>
      </aside>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 font-medium leading-none"
          )}
          {...props}
        >
          <div className="text-white text-sm font-medium leading-none">
            {title}
          </div>
          <p
            className="group-hover:text-white/70
            line-clamp-2
            text-sm
            leading-snug
            text-white/40
          "
          >
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
