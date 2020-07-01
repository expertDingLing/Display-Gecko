import React from "react";

import { MainLayout } from "./Main";
import { NarrowLayout } from "./NarrowLayout";

export const withMainLayout = Component => props => {
  return (
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  );
};

export const withPrimaryPageLayout = Component => props => {
  return (
    <NarrowLayout>
      <Component {...props} />
    </NarrowLayout>
  );
};
