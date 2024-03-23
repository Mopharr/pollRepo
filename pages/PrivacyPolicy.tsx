import { useState } from "react";
import { Container } from "../ui";
import styles from "../styles/privacy.module.css";
import  Link  from "next/link";
import { privacy } from "../constants/privacy";
import Hero1 from "../asset/image/Hero1.jpg";
import Television1 from "../asset/image/Television1.jpg";
import ManTalking from "../asset/image/ManTalking.jpg";
import ManWiring from "../asset/image/ManWiring.jpg";
import {
  faqOne,
  faqTwo,
  faqThree,
  faqFour,
  faqFive,
  faqSix,
} from "../constants/faq";
import FaqCard from "../ui/FaqCard/FaqCard"
import Image from "next/image";



const PrivacyPolicy = () => {
  const [clickIdOne, setClickIdOne] = useState<string | null>(null);
  const [clickIdTwo, setClickIdTwo] = useState<string | null>(null);
  const [clickIdThree, setClickIdThree] = useState<string | null>(null);
  const [clickIdFour, setClickIdFour] = useState<string | null>(null);
  const [clickIdFive, setClickIdFive] = useState<string | null>(null);
  const [clickIdSix, setClickIdSix] = useState<string | null>(null);

  return (
    <main className={styles.main}>
      <section>
        <div className={styles.content}>
          <h1>PollRepo Privacy Policy</h1>
        </div>
        <div className={styles.bottom}>
          <p>Effective: March 01, 2024</p>
        </div>
      </section>

      <section className={styles.notice}>
        <Container>
          <h3> Before you scroll, read this</h3>
          <p className={styles.upperText}>
            Crafting a Privacy Policy that pleases everyone is a challenge. Most
            PollRepo users prefer something concise and straightforward.
            Although we&quot;d love to condense all you need to know into a single
            post, our regulators require us to fulfill our legal duties by
            elaborating on them in great detail.
          </p>
          <p className={styles.upperText}>
            With clarity and simplicity in mind, we&quot;ve designed our Privacy
            Policy to empower you to make well-informed choices while using
            PollRepo. We ensure you understand and have control over the
            collection, usage, and sharing of your information.
          </p>

          <p className={styles.upperText}>
            Even if you don&quot;t read every word of the Privacy Policy, it&quot;s
            essential to grasp the following:
          </p>

          <div className={styles.policies}>
            {privacy.map((item) => {
              if (item.id === "p1" || item.id === "p2" || item.id === "p3") {
                return (
                  <div key={item.id} className={styles.policy}>
                    <h5>{item.title}</h5>

                    <p>{item.description}</p>
                  </div>
                );
              }
              return (
                <div key={item.id} className={styles.policy}>
                  <h5>{item.title}</h5>

                  <Link href={item.url}>{item.description}</Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={styles.dataEnquire}>
        <div>
          <h1>Seriously — what happens with my data?</h1>
        </div>

        <div>
          <Image src={Hero1} alt="man_with_camera" loading="lazy" />
        </div>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>What data do you collect about me?</h4>
            <h5>
              You give some data, we get some data. In return we offer useful
              services. Not what you had in mind? Check your settings.
            </h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                1. <span>Information We Collects</span>
              </b>
            </p>
            <p>
              When you engage with PollRepo, we gather information that falls
              into three primary categories. This data collection is essential
              for providing you with our tailored services and features.
            </p>
            <p>Expand dropdowns for more information:</p>
          </div>

          <div className={styles.faqContainer}>
            {faqOne.map((faq) => (
              <FaqCard
                key={faq.id}
                isActive={faq.id === clickIdOne}
                faq={faq}
                onToggle={() =>
                  setClickIdOne((prev) => (prev === faq.id ? null : faq.id))
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>How do you use my information?</h4>
            <h5>To make PollRepo&quot;s service you know and love.</h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                2. <span>How We Use Information</span>
              </b>
            </p>
            <p>
              Understanding the application of collected information within
              PollRepo involves recognizing the complex interplay of data across
              our diverse services. Given that a single piece of data can serve
              multiple functions to ultimately enhance your experience, we&quot;re
              outlining the principal ways we utilize information, alongside an
              additional focus on providing analytic views of opinion. Should
              you have any queries not addressed here, we encourage direct
              contact with us. Here&quot;s an overview:
            </p>
            <p>Expand dropdowns for more information:</p>
          </div>

          <div className={styles.faqContainer}>
            {faqTwo.map((faq) => (
              <FaqCard
                key={faq.id}
                isActive={faq.id === clickIdTwo}
                faq={faq}
                onToggle={() =>
                  setClickIdTwo((prev) => (prev === faq.id ? null : faq.id))
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.publicPost}>
        <div>
          <Image src={Television1} alt="television_pic" loading="lazy" />
        </div>

        <div>
          <h1>My posts are public?!?</h1>
        </div>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>How or when do you share my information?</h4>
            <h5>
              There’s no quick answer to this one, but heads up: posts can end
              up in the news or a search engine.
            </h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                3. <span>Sharing Information</span>
              </b>
            </p>
            <p>
              Understanding how and why your information is shared is crucial.
              PollRepo shares your information in several key ways, each
              designed to enhance your experience and maintain the integrity of
              our services. Below, we detail these sharing practices and the
              control you have over your information.
            </p>
            <p>Expand dropdowns for more information:</p>
          </div>

          <div className={styles.faqContainer}>
            {faqThree.map((faq) => (
              <FaqCard
                key={faq.id}
                isActive={faq.id === clickIdThree}
                faq={faq}
                onToggle={() =>
                  setClickIdThree((prev) => (prev === faq.id ? null : faq.id))
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.dataEnquire}>
        <div>
          <h1>Does data have an expiration date?</h1>
        </div>

        <div>
          <Image src={ManWiring} alt="data_center" loading="lazy" />
        </div>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>How long do you keep data?</h4>
            <h5>Generally, we keep your data as long as your account is up.</h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                4. <span>How Long We Keep Information</span>
              </b>
            </p>
            <p>
              PollRepo retains various types of information for differing
              timeframes: Profile Information and Content: These remain stored
              for as long as your account is active. Other Personally
              Identifiable Information: Data collected during your use of our
              services is generally retained for up to 18 months.
            </p>
            <p>Expand dropdowns for more information:</p>
          </div>

          <div className={styles.faqContainer}>
            {faqFour.map((faq) => (
              <FaqCard
                key={faq.id}
                isActive={faq.id === clickIdFour}
                faq={faq}
                onToggle={() =>
                  setClickIdFour((prev) => (prev === faq.id ? null : faq.id))
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>How can I control my data?</h4>
            <h5>
              You can access it, delete it, or change your settings. Basically,
              you’re the boss.
            </h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                5. <span>Take Control</span>
              </b>
            </p>

            <p>Expand dropdowns for more information:</p>
          </div>

          <div className={styles.faqContainer}>
            {faqFive.map((faq) => (
              <FaqCard
                key={faq.id}
                isActive={faq.id === clickIdFive}
                faq={faq}
                onToggle={() =>
                  setClickIdFive((prev) => (prev === faq.id ? null : faq.id))
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>How does PollRepo handle my information wherever I am?</h4>
            <h5>
              We treat your information fairly, no matter where you live around
              the world.
            </h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                6. <span>Your Rights and Ours at PollRepo</span>
              </b>
            </p>
            <p>
              PollRepo serves a global community, offering consistent privacy
              tools and controls to all users, regardless of their location.
              Yet, we tailor your experience to align with local laws and
              standards.
            </p>
            <p>Expand dropdowns for more information:</p>
          </div>

          <div className={styles.faqContainer}>
            {faqSix.map((faq) => (
              <FaqCard
                key={faq.id}
                isActive={faq.id === clickIdSix}
                faq={faq}
                onToggle={() =>
                  setClickIdSix((prev) => (prev === faq.id ? null : faq.id))
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>Is PollRepo for kids?</h4>
            <h5>Nope, PollRepo is not intended for people under 13.</h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                7. <span>User Eligibility</span>
              </b>
            </p>
            <p>
              PollRepo&quot;s services are not intended for children under 13 years
              of age. Users must meet the age requirement for data processing
              consent in their respective countries, with provisions for
              parental or guardian consent where applicable.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.publicPost}>
        <div>
          <Image src={ManTalking} alt="man_on_phone_call" loading="lazy" />
        </div>

        <div>
          <h1>You there, PollRepo?</h1>
        </div>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>Will this policy change?</h4>
            <h5>If it does, we’ll let you know.</h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                8. <span>Privacy Policy Updates</span>
              </b>
            </p>
            <p>
              Our commitment to transparency and compliance necessitates
              occasional updates to this Privacy Policy. Should significant
              changes occur, we&quot;ll notify you, allowing you to review the
              updates before continuing your use of PollRepo.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.enquire}>
        <Container>
          <div className={styles.infoBox}>
            <h4>Is this policy viewable in other languages?</h4>
            <h5>Yes, but...</h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                9. <span>Language and Interpretation</span>
              </b>
            </p>
            <p>
              While the PollRepo Privacy Policy is available in multiple
              languages for accessibility, the English version remains the
              definitive source. In any case of discrepancy between
              translations, the English text will prevail, serving as the basis
              for interpretation and understanding of our privacy practices.
            </p>
            <p>
              This framework underscores our dedication to protecting your
              privacy, adapting to global standards, and ensuring a respectful,
              secure environment for all PollRepo users.
            </p>
          </div>
        </Container>
      </section>

      <section className={`${styles.enquire} ${styles.lastEnquire}`}>
        <Container>
          <div className={styles.infoBox}>
            <h4>How can I contact PollRepo</h4>
            <h5>Slide into our … very official inbox.</h5>
          </div>

          <div className={styles.infoHeading}>
            <p>
              <b>
                10. <span>How To Contact PollRepo</span>
              </b>
            </p>
            <p>
              If you have any thoughts or questions about this Privacy Policy,
              we&quot;re here to listen and assist. For inquiries related to privacy
              concerns, please reach out to us through our Privacy Policy
              Inquiries page or by direct mail to the address provided below.
              Further details on how we handle requests under the California
              Consumer Privacy Act (CCPA) can be found on our website. For Users
              Outside the European Union, EFTA States, or the United Kingdom:
              The data controller responsible for your information is PollRepo,
              located at:
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.addressBox}>
        <Container>
          <div className={styles.addressFlex}>
            <p>
              <b>
                PollRepo
                <br /> Attn: Privacy Policy Inquiry
                <br /> 103, Olaitan Street, Surulere,
                <br /> Lagos, Nigeria
              </b>
            </p>

            <p>
              For Users in the European Union, EFTA States, or the United
              Kingdom: Please direct your inquiries to the same address as
              PollRepo manages data control responsibilities from our primary
              office for all users globally.
            </p>
          </div>

          <div className={styles.confidential}>
            <p>
              You also have the option to confidentially contact PollRepo&quot;s Data
              Protection Officer through our dedicated Data Protection Inquiry
              Form. Should you have concerns about our data processing
              practices, you are entitled to raise them with your local
              supervisory authority or directly with us.
            </p>
            <p>
              PollRepo is committed to maintaining transparent and responsible
              data practices, ensuring your privacy and security are at the
              forefront of our service.
            </p>

            {/* <button>View previous policies</button> */}
          </div>
        </Container>
      </section>

      <section className={styles.adjust}>
        <Container>
          <h1>Take control of your privacy</h1>
          <button>Adjust your settings</button>
        </Container>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
