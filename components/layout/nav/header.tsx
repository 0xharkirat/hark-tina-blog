"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = React.useState(false)
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="bg-background/80 fixed z-20 w-full backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-6">
            <div className="flex w-full items-center justify-between">
              <Link
                href="/"
                aria-label="home"
                className="text-foreground text-base font-medium no-underline hover:no-underline">
                {header.name}
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-6 text-sm">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="text-neutral-600 dark:text-neutral-400 hover:text-foreground block duration-150 no-underline">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-6 p-6 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:bg-transparent lg:p-0 dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-4 text-base">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="text-neutral-600 dark:text-neutral-400 hover:text-foreground block duration-150 no-underline">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
