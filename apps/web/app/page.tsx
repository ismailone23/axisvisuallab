import ContactForm from "./contact-form";
import styles from "./page.module.css";

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19 19 5M7 5h12v12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12h16m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const services = [
  {
    number: "01",
    title: "Websites & apps",
    description:
      "Websites, apps, and custom tech built to make your ideas work in the real world.",
  },
  {
    number: "02",
    title: "Video editing",
    description:
      "Sharp edits and visual storytelling that make every second count.",
  },
  {
    number: "03",
    title: "Graphic design",
    description:
      "Clear, memorable visuals for your brand, content, and campaigns.",
  },
];

export default function Home() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#top"
          aria-label="Axis Visual Lab, back to top"
        >
          <span className={styles.brandMark} aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className={styles.brandName}>
            axis<span className={styles.brandDot}>.</span>
            <small>VISUAL LAB</small>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#work">What we do</a>
          <a href="#about">The studio</a>
          <a href="#contact" className={styles.navContact}>
            Let&apos;s talk <ArrowIcon diagonal />
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>
                <span className={styles.statusDot} /> CREATIVE &amp; TECH STUDIO{" "}
                <span className={styles.eyebrowLine} /> BUILT FOR WHAT&apos;S
                NEXT
              </p>
              <h1 id="hero-title">
                Make it
                <br />
                <span>impossible</span>
                <br />
                to ignore<span className={styles.period}>.</span>
              </h1>
              <div className={styles.heroBottom}>
                <p>
                  Websites, apps, videos, and graphics that bring your ideas to
                  life. Built with purpose. Made to stand out.
                </p>
                <a
                  className={styles.circleLink}
                  href="#work"
                  aria-label="Explore what we do"
                >
                  <ArrowIcon />
                </a>
              </div>
            </div>
            <div className={styles.heroArt} aria-hidden="true">
              <div className={styles.artTop}>
                <span>AXIS / 001</span>
                <span>VISUAL THINKING ↗</span>
              </div>
              <div className={styles.artGrid} />
              <div className={`${styles.artOrbit} ${styles.artOrbitOne}`} />
              <div className={`${styles.artOrbit} ${styles.artOrbitTwo}`} />
              <div className={styles.artOrb} />
              <div className={styles.artCross}>+</div>
              <div className={styles.artBottom}>
                <span>
                  SHIFT YOUR
                  <br />
                  PERSPECTIVE
                </span>
                <span>© 2026</span>
              </div>
            </div>
          </div>
          <div className={styles.heroFoot}>
            <span>DESIGN WITH DIRECTION.</span>
            <span>
              SCROLL TO EXPLORE <span className={styles.downArrow}>↓</span>
            </span>
          </div>
        </section>

        <section
          className={styles.intro}
          id="work"
          aria-labelledby="work-title"
        >
          <div className={styles.sectionTop}>
            <span className={styles.sectionIndex}>01 / WHAT WE DO</span>
            <span>THE GOOD STUFF ↓</span>
          </div>
          <div className={styles.introGrid}>
            <h2 id="work-title">
              Good design
              <br />
              moves <em>people.</em>
            </h2>
            <div className={styles.introAside}>
              <span className={styles.asterisk} aria-hidden="true">
                ✳
              </span>
              <p>
                From the first idea to the final detail, we bring technology and
                creativity together to make work that connects.
              </p>
              <a className={styles.textLink} href="#contact">
                Have a project in mind? <ArrowIcon diagonal />
              </a>
            </div>
          </div>

          <div
            className={styles.showcase}
            aria-label="Examples of our creative disciplines"
          >
            <article className={styles.showcaseCard}>
              <div
                className={`${styles.showcaseArt} ${styles.identityArt}`}
                aria-hidden="true"
              >
                <span className={styles.identitySmall}>
                  THE ART OF
                  <br />
                  BEING SEEN
                </span>
                <div className={styles.identityShape}>
                  <span />
                </div>
                <span className={styles.identityWord}>
                  FORM<span> / </span>FEELING
                </span>
                <span className={styles.identityCorner}>A—01 / DESIGN</span>
              </div>
              <div className={styles.cardInfo}>
                <div>
                  <span>01 / GRAPHIC DESIGN</span>
                  <h3>Made to be remembered.</h3>
                </div>
                <ArrowIcon diagonal />
              </div>
            </article>
            <article className={styles.showcaseCard}>
              <div
                className={`${styles.showcaseArt} ${styles.digitalArt}`}
                aria-hidden="true"
              >
                <div className={styles.digitalWindow}>
                  <div className={styles.windowHeader}>
                    <span>axis / digital</span>
                    <span>✳ &nbsp; ◯ &nbsp; ↗</span>
                  </div>
                  <div className={styles.windowBody}>
                    <span>NEW PERSPECTIVES / 002</span>
                    <strong>
                      Beyond
                      <br />
                      <i>the ordinary.</i>
                    </strong>
                    <span className={styles.windowButton}>EXPLORE MORE ↗</span>
                  </div>
                </div>
                <span className={styles.digitalLabel}>
                  DESIGNED TO CONNECT. BUILT TO MOVE.
                </span>
              </div>
              <div className={styles.cardInfo}>
                <div>
                  <span>02 / WEB &amp; APPS</span>
                  <h3>Built to make an impact.</h3>
                </div>
                <ArrowIcon diagonal />
              </div>
            </article>
          </div>
          <p className={styles.showcaseNote}>
            A glimpse into our creative world — concept visuals by Axis Visual
            Lab.
          </p>
        </section>

        <section
          className={styles.services}
          id="about"
          aria-labelledby="about-title"
        >
          <div className={styles.sectionTop}>
            <span className={styles.sectionIndex}>02 / THE STUDIO</span>
            <span>SMALL STUDIO. BIG IDEAS.</span>
          </div>
          <div className={styles.servicesIntro}>
            <h2 id="about-title">
              Creative minds.
              <br />
              <span>Clear direction.</span>
            </h2>
            <p>
              Axis Visual Lab is a creative and tech studio for the ideas you
              want to put into the world. We build websites and apps, edit
              videos, and design graphics with care from start to finish.
            </p>
          </div>
          <div className={styles.serviceList}>
            {services.map((service) => (
              <div className={styles.serviceRow} key={service.number}>
                <span className={styles.serviceNumber}>{service.number} /</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className={styles.servicePlus} aria-hidden="true">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className={styles.contact}
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className={styles.sectionTop}>
            <span className={styles.sectionIndex}>03 / GET IN TOUCH</span>
            <span>YOUR NEXT BIG THING STARTS HERE</span>
          </div>
          <div className={styles.contactBody}>
            <div>
              <p className={styles.contactKicker}>
                <span className={styles.statusDot} /> OPEN FOR NEW PROJECTS
              </p>
              <h2 id="contact-title">
                Let&apos;s make
                <br />
                something <em>matter.</em>
              </h2>
            </div>
            <a
              className={styles.contactArrow}
              href="#contact-form"
              aria-label="Go to contact form"
            >
              <ArrowIcon diagonal />
            </a>
          </div>
          <div className={styles.contactDetails}>
            <div className={styles.contactAside}>
              <span>HAVE SOMETHING IN MIND?</span>
              <p>
                Tell us a little about your project and we&apos;ll be in touch.
              </p>
              <p>Prefer email? Write to us directly.</p>
              <a
                className={styles.emailLink}
                href="mailto:info@axisvisuallab.com"
              >
                info@axisvisuallab.com <ArrowIcon diagonal />
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.footerBrand} href="#top">
          axis<span>.</span>
          <small>VISUAL LAB</small>
        </a>
        <span>INDEPENDENT BY DESIGN.</span>
        <div>
          <span>© {new Date().getFullYear()} AXIS VISUAL LAB</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}
