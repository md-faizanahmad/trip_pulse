"use client";

import DesktopHeaderSkeleton from "../skeleton/DesktopHeaderSkeleton";
import DesktopHeader from "./DesktopHeader";
import MobileBottomNav from "./MobileBottomNav";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { isLoading } = useAuth();

  return (
    <>
      {isLoading ? <DesktopHeaderSkeleton /> : <DesktopHeader />}
      <MobileBottomNav />
    </>
  );
}
