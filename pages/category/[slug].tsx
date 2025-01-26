import { GetStaticPaths, GetStaticProps } from "next";
  import { withRouter } from "next/router";
  import { getConfig, fetchEntries } from "@builtjs/theme";
  import Page from "@/lib/theme/page";
  
  export default withRouter(Page);
  
  export const getStaticPaths: GetStaticPaths = async () => {
    const entryData:any = await fetchEntries('category');
    return {
      paths:
        entryData.entries.map(
          (entry:any) => `/category/${entry.slug}`
        ) ?? [],
      fallback: false,
    };
  };
  
  export const getStaticProps: GetStaticProps = async ({params}) => {
    const config = await getConfig({pageName: 'categoryArticle'});
    config.params = params;
    return {
      props: { config }
    };
  };