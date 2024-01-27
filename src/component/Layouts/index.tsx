"use client";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import DefaultLayout from "./Auth";
import BlankLayout from "./Blank";

const index = ({ children }: PropsWithChildren) => {
  const router = usePathname();
  const blankLayoutRoutes = ["/login"];
  const isBlankLayout = blankLayoutRoutes.includes(router);
  const Layout = isBlankLayout ? BlankLayout : DefaultLayout;
  return <Layout>{children}</Layout>;
};

export default index;
