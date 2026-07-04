"use client";

import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Drawer } from "vaul";

export function BottomDrawer({
  open,
  onOpenChange,
  children,
  className,
  desktopClassname,
  mobileClassname,
}) {
  const isDesktop = useMediaQuery();

  if (!isDesktop) {
    return (
      <React.Fragment>
        {open && (
          <div className="fixed inset-0 z-[60]">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onOpenChange}
            />

            {/* Modal */}
            <div
              className={cn(
                "absolute left-1/2 top-1/2",
                "-translate-x-1/2 -translate-y-1/2",
                "w-full min-w-0",
                "max-h-[90vh]",
                "overflow-hidden",
                "rounded-3xl bg-white shadow-2xl",
                className,
                desktopClassname,
              )}
            >
              <div
                className="overflow-y-auto max-h-[90vh] p-6"
                style={{ scrollbarWidth: "none" }}
              >
                {children}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" />

        <Drawer.Content
          className={cn(
            "fixed bottom-0 left-0 right-0 z-[61] bg-white backdrop-blur-sm rounded-t-xl max-h-[85vh] flex flex-col",
            className,
            mobileClassname,
          )}
        >
          <div className="flex flex-row text-center h-2 w-16 bg-gray-300 mb-3 rounded-full justify-center mx-auto" />
          {/* Content */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
