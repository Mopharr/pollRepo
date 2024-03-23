import { Helmet } from "react-helmet";
import { Container } from "@/ui";
import Mission from "@/asset/image/Mission.jpg";
import Why from "@/asset/image/why.jpg";
import Gathering from "@/asset/image/Gathering.jpg";
import OurStory from "@/asset/image/OurStory.jpg";
import World from "@/asset/image/world.jpg";
import JoinUs from "@/asset/image/JoinUs.jpg";
import styles from "@/styles/about.module.css";
import Image from "next/image";
const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
        <meta name="description" content="About Us" />
      </Helmet>

      <main className={styles.main}>
        <section className={styles.hero}>
          <Container className={styles.containerAbout}>
            <h2>Welcome to PollRepo</h2>
            <p>Your Digital Encyclopedia of Opinions</p>
          </Container>
        </section>

        <section className={styles.section}>
          <Container className={styles.containerAbout}>
            <div className={styles.aboutFlex}>
              <div className={styles.imageBox}>
                <Image src={Mission} alt="arrow_board" />
              </div>

              <div className={styles.infoBox}>
                <h4>Our Mission: &quot;Shape the Narrative&quot;</h4>
                <p>
                  At PollRepo, we embark on a revolutionary journey beyond the
                  confines of traditional social media platforms. We&&apos;re not just
                  another network; we&apos;re a vibrant repository of opinions,
                  debates, and evolving trends. Our mission is clear - to
                  empower you to shape the narrative, delve into a diverse world
                  of thoughts, and witness the ever-changing panorama of public
                  sentiment. With us, your voice doesn&apos;t just echo in a void; it
                  contributes to a global dialogue.
                </p>
              </div>
            </div>

            <div className={styles.aboutFlex}>
              <div className={styles.imageBox}>
                <Image src={Why} alt="portrait" />
              </div>

              <div className={styles.infoBox}>
                <h4>Why PollRepo Exists?</h4>
                <p>
                  In a digital era flooded with information, finding a
                  structured and reliable platform for public opinion and
                  discourse is rare. PollRepo exists to bridge this gap,
                  transforming how opinions are shared, debated, and archived.
                  Our platform is a testament to the power of collective
                  intelligence, offering a unique space where every vote counts
                  and every opinion matters. Here, we&apos;re not just observing
                  trends; we&apos;re setting them.
                </p>
              </div>
            </div>

            <div className={styles.aboutFlex}>
              <div className={styles.imageBox}>
                <Image src={Gathering} alt="portrait" />
              </div>

              <div className={styles.infoBox}>
                <h4>Gather Around Opinions</h4>
                <p>
                  At the heart of PollRepo are opinions - varied, vibrant, and
                  vital. Opinions that shape narratives, guide decisions, and
                  offer insights into our collective psyche. Through structured
                  voting mechanisms, PollRepo transcends traditional text-based
                  forums, providing clear snapshots of public sentiment. It&apos;s
                  where your voice contributes to a larger story, influencing
                  and being influenced by the global community.
                </p>
              </div>
            </div>

            <div className={styles.aboutFlex}>
              <div className={styles.imageBox}>
                <Image src={OurStory} alt="portrait" />
              </div>

              <div className={styles.infoBox}>
                <h4>Our Story: Building a Community of Narratives</h4>
                <p>
                  PollRepo&apos;s journey is a testament to the power of community
                  and collaboration. Like the earliest humans gathered around a
                  fire, sharing stories and wisdom, our platform is the digital
                  bonfire around which we gather to share, debate, and shape
                  opinions. Through polls, discussions, and dynamic voting, we
                  weave a rich tapestry of narratives, offering a comprehensive
                  encyclopedia of public sentiment.
                </p>
              </div>
            </div>

            <div className={styles.aboutFlex}>
              <div className={styles.imageBox}>
                <Image src={World} alt="portrait" />
              </div>

              <div className={styles.infoBox}>
                <h4>Understanding the World Through Polls</h4>
                <p>
                  PollRepo is more than a platform; it&apos;s a movement towards a
                  more informed, articulate, and engaged world. Here, every poll
                  is a story, every vote is a voice, and every opinion is an
                  opportunity to understand the world from a myriad of
                  perspectives. Whether you&apos;re here to observe, participate, or
                  contribute, you&apos;re part of a larger narrative, shaping the
                  future of public discourse.
                </p>
              </div>
            </div>

            <div className={styles.aboutFlex}>
              <div className={styles.imageBox}>
                <Image src={JoinUs} alt="portrait" />
              </div>

              <div className={styles.infoBox}>
                <h4>Join Us on This Journey</h4>
                <p>
                  We invite you to be part of PollRepo - where your opinions
                  pave the way for understanding and shaping the world&apos;s
                  narratives. It&apos;s a place where your voice matters, where
                  narratives evolve, and where the collective wisdom of the
                  world is just a poll away.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className={styles.end}>
          <Container className={styles.containerAbout}>
            <h2>
              Welcome to PollRepo – Where Every Opinion Matters, and Every
              Narrative Shapes the Future.
            </h2>
          </Container>
        </section>
      </main>
    </>
  );
};

export default About;
