"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  session?: unknown;
};

export default function SessionProvider({ children }: Props) {
  return <>{children}</>;
}
