"use client";

import React, { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from "@tanstack/react-query";

type Props = {
  children: ReactNode;
  state?: DehydratedState;
};

export default function TanStackProvider({ children, state }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
