import { useState } from "react";
import { logo, womandoctor } from "@/assets";
import {
  Calendar,
  EllipsisVertical,
  Home,
  IdCard,
  Menu,
  X,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

const navs = [
  {
    name: "Home",
    icon: Home,
    link: "#",
  },
  {
    name: "Patients",
    icon: Users,
    link: "#",
  },
  {
    name: "Schedule",
    icon: Calendar,
    link: "#",
  },
  {
    name: "Message",
    icon: MessageSquare,
    link: "#",
  },
  {
    name: "Transactions",
    icon: IdCard,
    link: "#",
  },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 rounded-3xl bg-white shadow-sm lg:rounded-full">
      <div className="flex items-center justify-between px-5 py-2 sm:px-8 lg:px-10">
        <img
          src={logo}
          alt="Logo"
          className="w-[150px] h-[40px] object-contain sm:w-[200px]"
        />

        {/* desktop nav */}
        <div className="hidden lg:flex items-center gap-5">
          {navs.map((nav) => (
            <a
              key={nav.name}
              href={nav.link}
              className={`flex items-center gap-2 p-2 ${
                nav.name === "Patients"
                  ? "text-brand-600 bg-[#01F0D0] rounded-full px-4 text-black"
                  : "text-brand-900"
              }`}
            >
              <nav.icon />
              <span>{nav.name}</span>
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <img src={womandoctor} alt="Doctor" className="h-[50px]" />
          <div>
            <h4 className="font-semibold text-[16px]">Dr. Olivia Martin</h4>
            <p className="text-[12px]">Internal Medicine</p>
          </div>
          <div className="flex flex-row gap-1">
            <Settings className="text-brand-900" size={24} />
            <EllipsisVertical className="text-brand-900" size={24} />
          </div>
        </div>

        {/* mobile nav */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-900 transition-colors hover:bg-[#F6F7F8] lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-header-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-header-menu"
          className="absolute left-0 right-0 top-full mt-2 rounded-3xl border border-[#EDEDED] bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="space-y-1">
            {navs.map((nav) => (
              <a
                key={nav.name}
                href={nav.link}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold ${
                  nav.name === "Patients"
                    ? "bg-[#01F0D0] text-black"
                    : "text-brand-900 hover:bg-[#F6F7F8]"
                }`}
              >
                <nav.icon size={20} />
                <span>{nav.name}</span>
              </a>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#F6F7F8] p-3">
            <img
              src={womandoctor}
              alt="Dr. Olivia Martin"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold">
                Dr. Olivia Martin
              </h4>
              <p className="truncate text-xs text-gray-500">
                Internal Medicine
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-900 hover:bg-white cursor-pointer"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-900 hover:bg-white cursor-pointer"
              aria-label="More options"
            >
              <EllipsisVertical size={20} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
