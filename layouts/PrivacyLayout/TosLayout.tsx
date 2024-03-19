import { Helmet } from "react-helmet";
import TermsOfService from "../../pages/TermsOfService";

const TosLayout = () => {
  return (
    <>
      <Helmet>
        <title>Terms of service</title>
        <meta name="description" content="Polls Details" />
      </Helmet>
      <TermsOfService />
    </>
  );
};

export default TosLayout;
