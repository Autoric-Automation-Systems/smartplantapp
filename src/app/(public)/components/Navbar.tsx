"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import logo from "../../../../public/images/logo/logo.png"

export const Navbar = () => {
  const navigation = [
    "Home",

  ];

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        {/* Logo  */}
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
            <span>
              <Image
                src={logo}
                width="500"
                alt="N"
                height="500"
                className="w-40"
              />
            </span>
          </span>
        </Link>

        {/* Menu para desktop */}
        <div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
          {/* <ThemeChanger /> */}
          <div className="hidden mr-3 lg:flex nav__item">
            <Link href="/signin" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
              Signin
            </Link>
          </div>
        </div>

        {/* Botão de hamburger para mobile */}
        <Disclosure as="div" className="lg:hidden">
          <DisclosureButton className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <span className="sr-only">Abrir menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </DisclosureButton>

          {/* Menu mobile */}
          <DisclosurePanel className="absolute left-0 right-0 z-50 w-full mt-2 bg-white rounded-lg shadow-lg top-full dark:bg-gray-900">
            <div className="px-5 py-3 space-y-3">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href="/"
                  className="block px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  {item}
                </Link>
              ))}

              {/* Botão de login no mobile */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                <Link
                  href="/signin"
                  className="block w-full px-6 py-3 text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Signin
                </Link>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </nav>
    </div>
  );
}

