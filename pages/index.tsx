import { GetStaticProps } from 'next';
import { withRouter } from "next/router";
// import { getConfig } from "@builtjs/theme";
import { getConfig } from "../theme/index";
import Page from "../lib/theme/page";

export default withRouter(Page);

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig({pageName: 'home'});
  return {
    props: { config }
  };
};