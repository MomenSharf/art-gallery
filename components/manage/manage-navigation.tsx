"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Images, Plus, UserRound } from "lucide-react";
import { motion } from "motion/react";

import LogoutButton from "@/components/manage/logout-button";

const links = [
  {
    href: "/manage/library",
    label: "المكتبة",
    icon: Images,
  },
  {
    href: "/manage/new",
    label: "عمل جديد",
    icon: Plus,
  },
  {
    href: "/manage/profile",
    label: "الملف الشخصي",
    icon: UserRound,
  },
];

export default function ManageNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {links.map((link) => {
        const Icon = link.icon;

        const active =
          pathname === link.href ||
          (link.href === "/manage/library" &&
            pathname.startsWith("/manage/edit"));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-all ${
              active
                ? "text-black"
                : "text-black/45 hover:bg-white/70 hover:text-black"
            }`}
          >
            {/* Active background */}
            {active && (
              <motion.span
                layoutId="manage-active"
                className="absolute inset-0 rounded-xl bg-white shadow-sm"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            {/* Icon */}
            <span className="relative z-10">
              <Icon
                className={`size-4 transition-transform ${
                  active
                    ? "text-black"
                    : "group-hover:-translate-y-0.5"
                } ${
                  link.href === "/manage/new"
                    ? "group-hover:rotate-90"
                    : ""
                }`}
              />
            </span>

            {/* Text */}
            <span className="relative z-10 hidden md:inline">
              {link.label}
            </span>
          </Link>
        );
      })}

      <div className="mx-1 h-5 w-px bg-black/10" />

      <LogoutButton />
    </nav>
  );
}