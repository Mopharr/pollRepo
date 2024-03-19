import { Helmet } from "react-helmet";
import PrivacyPolicy from "../../pages/PrivacyPolicy";

const PrivacyPolicyLayout = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Polls Details" />
      </Helmet>
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyLayout;
