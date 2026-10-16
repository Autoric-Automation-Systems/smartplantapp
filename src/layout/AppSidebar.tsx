"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { GridIcon, UserCircleIcon } from "../icons/index";
import { AlarmsIcon, CompanyIcon, PlantIcon, UsersIcon } from "../icons/NavIcons";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/dashboard" },
  { icon: <AlarmsIcon />, name: "Alarms", path: "/alarms" },
  { icon: <PlantIcon />, name: "Plants", path: "/plants" },
  { icon: <CompanyIcon />, name: "Company", path: "/company" },
  { icon: <UsersIcon />, name: "Users", path: "/users" },
  { icon: <UserCircleIcon />, name: "Profile", path: "/profile" },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar } =
    useSidebar();
  const pathname = usePathname();

  const isActive = useCallback(
    (path: string) => pathname === path || pathname.startsWith(`${path}/`),
    [pathname]
  );

  const showLabels = isExpanded || isHovered || isMobileOpen;

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-[calc(100dvh-4rem)] flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:mt-0 lg:h-dvh ${
        isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}
      >
        <Link href="/home" aria-label="Smart Plant - início">
          {showLabels ? (
            <Image
              src="/images/logo/logo.png"
              alt="Smart Plant"
              width={150}
              height={40}
              unoptimized
            />
          ) : (
            <Image
              src="/images/logo/logoicon.png"
              alt="Smart Plant"
              width={62}
              height={62}
              unoptimized
            />
          )}
        </Link>
      </div>

      {showLabels && (
        <p className="mb-3 text-xs uppercase leading-[20px] text-gray-400">Menu</p>
      )}

      <nav className="no-scrollbar flex-1 overflow-y-auto pb-6">
        <ul className="flex flex-col gap-2">
          {navItems.map((nav) => {
            const active = isActive(nav.path);
            return (
              <li key={nav.name}>
                <Link
                  href={nav.path}
                  aria-current={active ? "page" : undefined}
                  title={nav.name}
                  // no mobile a gaveta fecha ao navegar, para não cobrir a página nova
                  onClick={() => isMobileOpen && toggleMobileSidebar()}
                  className={`menu-item group ${active ? "menu-item-active" : "menu-item-inactive"} ${
                    showLabels ? "lg:justify-start" : "lg:justify-center"
                  }`}
                >
                  <span
                    className={
                      active ? "menu-item-icon-active" : "menu-item-icon-inactive"
                    }
                  >
                    {nav.icon}
                  </span>
                  {showLabels && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {showLabels ? <SidebarWidget /> : null}
    </aside>
  );
};

export default AppSidebar;
