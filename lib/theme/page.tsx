/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { getComponents } from "@/lib/builtjs-utils";
import { transformPage, fetchEntry, fetchEntries } from "@builtjs/theme";

const Page = ({ config }: any) => {
  const router = useRouter();
  const { slug } = router.query;

  const [page, setPage] = useState<any>(null);
  const [sectionComps, setSectionComps] = useState<React.ComponentType<any>[]>([]);
  const [layoutComps, setLayoutComps] = useState<React.ComponentType<any>[]>([]);

  const init = useCallback(async () => {
    if (!config) {
      return;
    }
    const page = await transformPage(config);
    if (!page) {
      return;
    }
    const [sectionComponents, layoutComponents] = await Promise.all([
      getComponents(page.sections),
      getComponents(page.layout.sections),
    ]);
    setPage(page);
    setSectionComps(sectionComponents);
    setLayoutComps(layoutComponents);
  }, [config]);

  useEffect(() => {
    setPage(null);
    setLayoutComps([]);
    init();
  }, [slug, init]);

  return (
    <Layout layoutComps={layoutComps} page={page}>
      {page &&
        sectionComps.length > 0 &&
        sectionComps.map((Section: React.ComponentType<any>, i: number) => (
          page.sections[i] && (
            <Section
              key={i}
              api={{ fetchEntry, fetchEntries }}
              content={page.sections[i].content}
            />
          )
        ))}
    </Layout>
  );
};

export default Page;
