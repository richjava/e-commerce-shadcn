import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { getComponents } from "@/lib/builtjs-utils";
import { transformPage, fetchEntry, fetchEntries } from "@builtjs/theme";

const Page = ({ config }: any) => {
  const router = useRouter();
  const { slug } = router.query;
  const [page, setPage] = useState<any>(null);
  const [sectionComps, setSectionComps] = useState<React.ComponentType<{}>[]>([]);
  const [layoutComps, setLayoutComps] = useState<React.ComponentType<{}>[]>([]);

  useEffect(() => {
    setPage(null);
    setLayoutComps([]);
    init();
  }, [slug]);

  async function init() {
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
  }

  return (
    <Layout layoutComps={layoutComps} page={page}>
      {page &&
        sectionComps.length > 0 &&
        sectionComps.map((Section: any, i: number) => (
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
