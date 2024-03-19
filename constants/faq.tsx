import styles from "../ui/FaqCard/faqcard.module.css";

export type Faq = {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
};

export const faqOne: Faq[] = [
  {
    id: "f1",
    question: (
      <p>
        <b>
          1.1 <span>Information You provide.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          To access certain features of PollRepo, creating an account is
          necessary, which entails providing specific information:
        </p>
        <ul className={styles.listOne}>
          <li>
            <b>Personal Accounts:</b> For setting up a personal account, we
            require details such as a display name (e.g., "Poll Enthusiast"), a
            username (e.g., @PollFanatic), password, email address or phone
            number, birth date, preferred display language, and third-party
            single sign-on details if preferred. You have the option to include
            your location in your profile and posts, and upload your address
            book to help locate acquaintances on PollRepo. Profile information,
            including display name and username, is public. You can opt for your
            real name or a pseudonym and manage multiple accounts to represent
            various aspects of your identity or professional life.
          </li>

          <li>
            <b>Professional Accounts:</b> Creating a professional account
            necessitates additional information like your business category. You
            might also provide a street address, contact email, and phone
            number, which will be publicly visible.
          </li>

          <li>
            <b>Payment Information:</b> For purchasing advertisements or other
            premium services, payment details such as credit/debit card number,
            expiration date, CVV code, and billing address are required.
          </li>

          <li>
            <b>Preferences:</b> Your settings preferences are collected to
            adhere to your choices within the platform.
          </li>

          <li>
            <b>Biometric Information:</b> With your consent, we may collect
            biometric data for security and identification purposes.
          </li>

          <li>
            <b>Employment Information:</b> For job applications or
            recommendations, we collect information about your employment
            history, education, job preferences, skills, job search activities,
            etc., to suggest potential job opportunities, share with potential
            employers, help employers find candidates, and deliver more relevant
            ads.
          </li>

          <li>
            <b>
              Utilization of Personal Information for Analytics and Targeted
              Polls:
            </b>{" "}
            We leverage personal information to generate detailed analytics on
            opinion trends across various demographics and personality types.
            This data enables us to:
          </li>
        </ul>

        <ul className={styles.padLeft}>
          <li>Provide insights into public sentiment and trends.</li>
          <li>
            Tailor polls to specific groups, ensuring that certain surveys are
            directed towards the most relevant individuals based on
            demographics, interests, and other criteria.
          </li>
          <li>
            This strategic use of personal data helps in refining our services
            and ensuring that PollRepo remains a dynamic and insightful platform
            for gauging public opinion and fostering community engagement.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "f2",
    question: (
      <p>
        <b>
          1.2 <span>Information we collect when you use PollRepo.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          As you navigate through PollRepo, we gather data on your interactions
          and usage to enhance your experience, maintain a secure and respectful
          environment, and tailor our services to your preferences.
        </p>

        <div>
          <div>
            <p>
              <b>Usage Information:</b> We collect details on your activities
              within PollRepo, including:
            </p>

            <ul className={styles.listTwo}>
              <li>
                Content you share (votes,posts, creation dates, application
                versions), your engagement in broadcasts (e.g., polls you've
                initiated, participation dates), and your involvement in
                comments, bookmarks, and communities.
              </li>

              <li>
                Your interactions with content from other users, such as votes,
                likes, bookmarks, shares, replies, mentions, tags,
              </li>
              <li>
                How you connect with others on the platform, including follows,
                followers, encrypted message metadata, and direct message
                details (message content, recipients, timestamps).
              </li>
              <li>
                Communications with us (e.g., emails) include the content and
                context of these interactions
              </li>
              <li>
                Your interactions with links across our services, including
                emails from us.
              </li>
            </ul>
          </div>

          <div>
            <p>
              <b>Device Information:</b> from your devices used to access
              PollRepo is collected, including:
            </p>

            <ul className={styles.listTwo}>
              <li>Connection specifics (IP address, browser type).</li>

              <li>
                Device and settings information (IDs, operating system, carrier,
                language, installed apps, battery status).
              </li>
              <li>Your device's address book, if shared with us.</li>
            </ul>
          </div>

          <div>
            <p>
              <b>Location Information:</b> We collect approximate location data
              to tailor our service to your expectations, like showing relevant
              polls or ads. You can opt to share your precise current or past
              locations through your account settings.
            </p>
          </div>

          <div>
            <p>
              <b>Inferred Identity:</b> Information is collected or inferred to
              identify you, such as:
            </p>

            <ul className={styles.listTwo}>
              <li>
                Associating your browser or device with your account and, based
                on settings, linking your account with other browsers or
                devices.
              </li>

              <li>
                Associating additional information you provide (e.g., email,
                phone number) with your account, potentially inferring further
                details about your identity.
              </li>
            </ul>
          </div>

          <div>
            <p>
              <b>Logo Information:</b> Data is received when you interact with
              our services, whether signed in or not, including:
            </p>

            <ul className={styles.listTwo}>
              <li>
                IP addresses, browser details, operating systems, referral
                pages, access times, visited pages, location, mobile carrier,
                device information, search terms, ads interactions,
                PollRepo-generated identifiers, and cookie-associated
                identifiers.
              </li>
            </ul>
          </div>

          <div>
            <p>
              <b>Advertisements:</b> We collect data on your interactions with
              ads on PollRepo and external platforms, including views, clicks,
              and engagements.
            </p>
          </div>

          <div>
            <p>
              <b>Cookies and Similar Technologies:</b> Cookies and similar tools
              are used to gather website usage data and facilitate service
              operation, enhancing user experience even for parts of our
              services not requiring cookies, like public profile browsing.
            </p>
          </div>

          <div>
            <p>
              <b>Third-Party Site Interactions:</b> When you engage with
              PollRepo content on external sites (e.g., embedded content), we
              receive log information, including the web page you visited. This
              comprehensive data collection supports our efforts to provide
              analytics on opinion across demographics and personalities,
              allowing us to offer more personalized and relevant experiences,
              including restricting certain polls to targeted groups.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "f3",
    question: (
      <p>
        <b>
          1.3 <span>Information Receive from third parties.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          PollRepo receives information from various external sources to enrich
          the platform's understanding of user preferences and behaviors.
        </p>

        <div>
          <div>
            <p>
              <b>Ad Partners, Developers, Publishers:</b> Our network of
              advertising and business partners share data with us, including
              browser cookie IDs, PollRepo-generated identifiers, mobile device
              IDs, hashed details such as email addresses, as well as
              demographic or interest-based data, and insights on content
              interactions within websites or apps. Our ad partners, especially
              those placing ads, may also allow us to gather similar data
              directly from their platforms by incorporating our advertising
              technologies. Information received from ad partners and
              affiliates, or collected by PollRepo from their platforms, is
              integrated with the data you provide to us and other information
              we collect, generate, or infer about you, as detailed throughout
              this Privacy Policy.
            </p>
          </div>

          <div>
            <p>
              <b>Other Third Parties, Account Connections, and Integrations:</b>{" "}
              Beyond our advertising circle, we obtain information about you
              from third-party sources not limited to our ad partnerships. This
              includes other PollRepo users, developers, partners assessing
              content safety and quality, our corporate affiliates, and
              additional services such as social media accounts that you connect
              to your PollRepo account. When you link PollRepo to another
              service's account, that service may share information with us
              about your activities on their platform. For instance, if you
              decide to create or login to your pollRepo account via social
              media or other accounts9e.g Facebook, Google, Apple, Twitter), We
              will have access to certain information from that platform such as
              your name, list of friends and followers and profile picture, in
              accordance with the authorization procedures determined by such
              platforms.
            </p>
          </div>

          <div>
            <p>
              This comprehensive approach to data integration allows PollRepo to
              deliver a more personalized and secure user experience, leveraging
              insights from across the digital ecosystem to enhance our service
              offerings and ensure content relevance.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

export const faqTwo: Faq[] = [
  {
    id: "f4",
    question: (
      <p>
        <b>
          2.1 <span>Operate, Improve, and Personalize Our Services.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          The data we gather is pivotal for delivering, operating, and enhancing
          PollRepo's offerings. We tailor and refine our services to ensure your
          experience is as engaging and relevant as possible, from content
          customization to add personalization and demographic analytics . This
          includes recommending users and topics, facilitating discoveries of
          affiliates and third-party apps, and employing collected data along
          with publicly available information to refine our machine learning or
          AI models as per this policy's scope.
        </p>

        <p>
          Connections between your PollRepo account and other services enrich
          functionalities like cross-posting and authentication, further
          expanding our service efficiency. Your contact details assist in
          making your profile accessible to others, in alignment with your
          preferences, extending to third-party platforms and applications. In
          advertising and content sponsorship contexts, we adjust our strategies
          based on your preferences, enhancing ad relevance both within and
          outside PollRepo. Data from ad partners, integrated directly or
          indirectly, complements your shared information, refining our
          advertising efficacy and device recognition capabilities for ad
          delivery.
        </p>
      </>
    ),
  },
  {
    id: "f5",
    question: (
      <p>
        <b>
          2.2 <span>Foster Safety and Security.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          The safety and integrity of our platform and its users are paramount.
          We deploy collected data to safeguard against unauthorized access,
          fraud, and illegal activities. This encompasses identity verification,
          account authentication, and policy enforcement against harmful or
          prohibited content, thereby maintaining a secure and respectful
          environment.
        </p>
      </>
    ),
  },
  {
    id: "f6",
    question: (
      <p>
        <b>
          2.3 <span>Measure, Analyze, and Enhance Our Services.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          We leverage analytics to gauge and enhance the effectiveness of
          PollRepo's features. Understanding user engagement patterns allows us
          to continuously improve and adapt our services to meet evolving user
          needs.
        </p>
      </>
    ),
  },
  {
    id: "f7",
    question: (
      <p>
        <b>
          2.4 <span>Analytic Insights into Public Opinions</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Integrating analytic views of opinion within the operational framework
          allows us to offer users comprehensive insights into trends across
          various demographics and personalities. This endeavor not only
          personalizes the experience but also amplifies the value of content by
          providing a broader context of public sentiment, fostering a more
          informed and interactive community dialogue.
        </p>
      </>
    ),
  },
  {
    id: "f8",
    question: (
      <p>
        <b>
          2.5 <span>Communicate With You</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          We utilize your information to keep you informed about PollRepo
          updates, policy changes, and service enhancements. Additionally, with
          your consent, we may engage you with marketing communications to
          introduce new features or offerings.
        </p>
      </>
    ),
  },
  {
    id: "f81",
    question: (
      <p>
        <b>
          2.6 <span>Research</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Data shared by you, alongside information we compile, supports our
          research efforts. Through surveys, product testing, and
          troubleshooting, we aim to refine and elevate the functionalities of
          PollRepo.
        </p>
      </>
    ),
  },
];

export const faqThree: Faq[] = [
  {
    id: "f9",
    question: (
      <p>
        <b>
          3.1 <span>When You Post and Share.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <div>
          <div>
            <p>
              <b>With the General Public:</b> By engaging with PollRepo, you
              authorize us to disseminate your content widely. This includes
              your profile details (such as name or pseudonym, username, profile
              pictures), making them accessible to a broad audience, including
              non-registered viewers and through external search engine queries.
            </p>
          </div>

          <div>
            <p>
              <b>With Other PollRepo Users:</b> Your interaction settings
              dictate the sharing of your engagements, like likes and follows,
              with other users. Direct Messages and protected posts shared with
              users accessing PollRepo via third-party services may also be
              shared with those services.
            </p>
          </div>

          <div>
            <p>
              <b>With Partners:</b> Subject to your preferences, we share
              certain information with partners to enhance service delivery.
              Control over data sharing with business partners is managed
              through your Privacy & Safety settings, distinct from other forms
              of data sharing outlined in this policy or in service-specific
              provisions.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "f10",
    question: (
      <p>
        <b>
          3.2 <span>With Third Parties & Integrations</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <div>
          <div>
            <p>
              <b>Service Providers:</b> We engage service providers to perform
              various functions, including hosting, payment processing, usage
              analytics, applicant tracking, and fraud detection, sharing
              necessary information with them to fulfill these services.
            </p>
          </div>

          <div>
            <p>
              <b>Advertisers:</b> Our ad-supported model necessitates sharing
              engagement data with advertisers, who may learn about your
              interactions with ads both on and off PollRepo. This data might
              include the source of your visit and ad-specific details, along
              with personal data like cookie IDs or IP addresses collected by
              advertisers.
            </p>
          </div>

          <div>
            <p>
              <b>Third-Party Content & Integrations:</b> With your consent or
              direction, we share information with third parties, such as when
              authorizing external applications to access your account or
              sharing feedback with businesses. Our collaborations with
              third-party content providers aim to enrich your PollRepo
              experience, with privacy implications governed by their respective
              policies.
            </p>
          </div>

          <div>
            <p>
              <b>Through APIs:</b> Public information from PollRepo is made
              available to external parties via APIs and embeds, under regulated
              terms to ensure appropriate use. These external offerings,
              however, may not immediately reflect updates made on PollRepo.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "f11",
    question: (
      <p>
        <b>
          3.3 <span>Legal, Harm Prevention, and Public Interest.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          We reserve the right to preserve and disclose your information when
          necessary to comply with legal obligations, protect safety, address
          security or technical issues, safeguard our rights or property, or
          protect the rights of users.
        </p>
      </>
    ),
  },
  {
    id: "f12",
    question: (
      <p>
        <b>
          3.4 <span>With Our Affiliates.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Information sharing among PollRepo affiliates enables us to deliver
          and enhance our products and services efficiently, leveraging shared
          resources and insights to improve user experience.
        </p>
      </>
    ),
  },
  {
    id: "f13",
    question: (
      <p>
        <b>
          3.5 <span>As a result of a change in ownership.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          We may share, sell, or transfer information about you in connection
          with a merger, acquisition, reorganization, sale of assets, or
          bankruptcy. This Privacy Policy will apply to your personal
          information that is shared with (before and after the close of any
          transaction) or transferred to the new entity.
        </p>
      </>
    ),
  },
];

export const faqFour: Faq[] = [
  {
    id: "f10",
    question: (
      <p>
        <b>
          4.1 <span>Public Content Persistence.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Even after removal from PollRepo, public content might persist
          elsewhere, such as within search engine caches or through third
          parties, based on their privacy policies.
        </p>
      </>
    ),
  },
  {
    id: "f11",
    question: (
      <p>
        <b>
          4.2 <span>Account Suspension for Rule Violation.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Identifiers associated with suspended accounts for policy violations
          (e.g., email, phone number) may be kept indefinitely to deter repeat
          offenses. Extended Retention for Legal and Safety Reasons: Certain
          information might be retained beyond our standard periods to fulfill
          legal obligations or ensure the safety and security of our platform
          and its users.
        </p>
      </>
    ),
  },
  {
    id: "f12",
    question: (
      <p>
        <b>
          4.3 <span>Exception for Legacy Polls</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Notably, PollRepo reserves the right to retain polls designated as
          "legacy polls," even if you delete your account or request deletion.
          This is a specific exception made to preserve the value these polls
          bring to the community. Legacy polls have the potential to be
          transferred to another user or revert to PollRepo's stewardship,
          ensuring that these significant contributions remain accessible and
          continue to enrich the community discourse.
        </p>

        <p>
          This approach underscores our commitment to maintaining a rich, safe,
          and respectful digital environment, while also respecting individual
          privacy rights and the collective interests of the PollRepo community.
        </p>
      </>
    ),
  },
];

export const faqFive: Faq[] = [
  {
    id: "f16",
    question: (
      <p>
        <b>
          5.1 <span>Access, Correction, Portability.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          You can manage your information via profile editing and account
          settings adjustment. Detailed insights and additional information
          access requests can be made through the PollRepo Data section.
        </p>

        <p>
          A copy of your data, like posts, can be downloaded as outlined in our
          user guidance. For privacy and security, identity verification
          precedes access or changes to personal data. Requests may be declined
          under specific circumstances, such as unverified identity.
        </p>
      </>
    ),
  },
  {
    id: "f17",
    question: (
      <p>
        <b>
          5.2 <span>Deleting Your Information.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Account deactivation and subsequent data deletion steps are provided
          on PollRepo. Deactivated accounts become invisible on PollRepo
          platforms, with a 30-day window for possible restoration unless it's a
          legacy poll.
        </p>

        <p>
          Legacy Polls Exception: Legacy polls are exempt from user-initiated
          deletion but can be nominated for transfer to another user or based on
          community or PollRepo recommendations. This ensures the preservation
          of valuable community content while respecting user contributions and
          preferences.
        </p>
      </>
    ),
  },
  {
    id: "f18",
    question: (
      <p>
        <b>
          5.3{" "}
          <span>Objecting to, Restricting, or Withdrawing your Consent.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Privacy settings and account features are adjustable, with system-wide
          updates of changes taking time. Adjusting settings may alter your
          PollRepo experience, including access to specific functionalities.
        </p>

        <p>
          User experience customizations, including content interaction
          preferences, are manageable across the platform.
        </p>
        <p>
          PollRepo observes the Digital Advertising Alliance principles for
          interest-based advertising, offering opt-out options for users.
        </p>
      </>
    ),
  },
  {
    id: "f19",
    question: (
      <p>
        <b>
          5.4 <span>Authorized Agent Requests.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          Requests for information access, modification, or deletion can be made
          directly or through an authorized agent, with verification steps to
          ensure request legitimacy.
        </p>

        <p>
          For all matters concerning privacy and data management, PollRepo
          encourages direct communication, underscoring our commitment to user
          privacy, data integrity, and transparent information handling
          practices.
        </p>
      </>
    ),
  },
];
export const faqSix: Faq[] = [
  {
    id: "f20",
    question: (
      <p>
        <b>
          6.1 <span>Legal Bases for Using Your Information.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          PollRepo has rigorously assessed the legal grounds for processing your
          information, ensuring compliance with applicable laws. We encourage
          you to explore further details about our data processing practices to
          understand the legal frameworks guiding our operations. Rest assured,
          we do not sell your personal information.
        </p>
      </>
    ),
  },
  {
    id: "f21",
    question: (
      <p>
        <b>
          6.2 <span>Data Movement for Global Connectivity.</span>
        </b>
      </p>
    ),
    answer: (
      <>
        <p>
          In facilitating global interactions, PollRepo may transfer data across
          international borders. This is essential for providing a seamless
          service, whether you're conversing with someone across the globe or
          accessing our platform from various locations. We utilize data
          centers, cloud services, and work with affiliates and third-party
          service providers worldwide to maintain service reliability and
          safety. Data transfers are carefully managed, with standard
          contractual clauses (SCCs) employed where needed to safeguard your
          data rights. For inquiries or requests regarding SCCs, please reach
          out to us. We also ensure that any third-party partners uphold the
          same data protection standards as PollRepo.
        </p>
      </>
    ),
  },
];
