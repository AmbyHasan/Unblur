"use client"
import { Button } from "@/components/ui/button";
import { Router } from "lucide-react";
import { useState, useEffect  } from "react";
import { useRouter } from "next/navigation";



const features = [
  { icon: "🎯", label: "01", title: "Doubt Marketplace", desc: "Post technical questions and receive targeted proposals from domain experts. AI enhances your doubt for maximum clarity and reach." },
  { icon: "🧑‍💻", label: "02", title: "1-on-1 Mentorship", desc: "Book paid video sessions with verified experts. 30 to 60 minute slots with live code walkthroughs and screen sharing." },
  { icon: "🗣️", label: "03", title: "Group Discussions", desc: "Structured, moderated GD rooms with speaker queues, time limits, and host controls. Up to 15 participants per session." },
  { icon: "🎓", label: "04", title: "Live Seminars", desc: "Deep-dive educational sessions by top-rated experts. Polls, Q&A, recordings, and AI summaries included." },
  { icon: "🤖", label: "05", title: "AI Enhancement", desc: "GPT-4 optimizes your doubt titles, generates tags, recommends experts, and auto-creates post-session summaries." },
  { icon: "⭐", label: "06", title: "Reputation System", desc: "Earn reputation scores through sessions, GDs, and seminars. Unlock hosting privileges and featured placement." },
];

const domains = [
  "Data Structures & Algorithms", "System Design", "Backend Development",
  "Frontend Development", "Full Stack", "Artificial Intelligence",
  "Machine Learning", "Data Science", "Cloud Computing",
  "DevOps", "Cybersecurity", "Product Management",
  "Career & Interview Prep", "Mobile Development", "Data Engineering",
];

const testimonials = [
  { text: "Resolved a Redis microservices issue in under 45 minutes. The expert's explanation was crystal clear. UNBLUR is exactly what the Indian dev ecosystem needed.", name: "Priya S.", role: "Backend Engineer", color: "#FFE500", initials: "PS" },
  { text: "I've hosted 12 seminars and earned ₹80,000+ in 3 months. The platform handles everything — payments, scheduling, video. I just focus on teaching.", name: "Rajesh V.", role: "Senior Architect", color: "#FF6B35", initials: "RV" },
  { text: "The AI summary after my session was surprisingly good. Had action items, resources, and even next steps. Felt like a real course, not just a random call.", name: "Aisha P.", role: "CS Student, IIT Delhi", color: "#00D9FF", initials: "AP" },
];

const steps = [
  { n: "01", title: "Post Your Doubt", desc: "Describe your problem, attach files, AI enhances it" },
  { n: "02", title: "Get Proposals", desc: "Matched experts submit tailored resolution proposals" },
  { n: "03", title: "Compare & Choose", desc: "Review ratings, approach, pricing and select expert" },
  { n: "04", title: "Pay Securely", desc: "Razorpay payment with signature verification" },
  { n: "05", title: "Join Session", desc: "Live video call with screen share & code walkthrough" },
  { n: "06", title: "Get Summary", desc: "AI-generated recap with action items & resources" },
];

export default function UnblurLanding() {
  const router=useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [activeChip, setActiveChip] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e:any) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll("a, button, .btn-primary, .btn-secondary, .domain-chip, .feature-card, .price-cta");
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    els.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
  });

  const marqItems = ["Doubt Marketplace", "Expert Mentorship", "Live Seminars", "Group Discussions", "AI Summaries", "Reputation System", "Paid Sessions", "Real-time Video"];

  return (
    <>
      <div className="noise" />
      <div className="cursor" style={{ left: cursorPos.x, top: cursorPos.y, ...(hovering ? { width: 40, height: 40 } : {}) }} />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="logo">UN<span>BLUR</span></a>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#domains">Domains</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><Button className="nav-cta" onClick={()=>router.push("/auth")}>Get Started</Button></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="yellow-dot" />
        <div className="hero-bg-text">LEARN</div>
        <div className="hero-left">
          <div className="hero-tag">India's Premier Tech Mentorship Platform</div>
          <h1>
            <div>STOP</div>
            <div className="yellow">BEING</div>
            <div className="outline">STUCK.</div>
          </h1>
          <p className="hero-sub">
            Connect with <strong>domain experts</strong> for paid 1-on-1 sessions, live group discussions, and structured seminars. <strong>AI-enhanced</strong> matching ensures you get the right expert every time.
          </p>
          <div className="hero-btns">
            <a href="#join" className="btn-primary">Post a Doubt</a>
            <a href="#features" className="btn-secondary">Explore Platform</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item"><div className="stat-num">500+</div><div className="stat-label">Expert Mentors</div></div>
            <div className="stat-item"><div className="stat-num">15+</div><div className="stat-label">Tech Domains</div></div>
            <div className="stat-item"><div className="stat-num">₹1,250</div><div className="stat-label">Starting Price</div></div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card-stack">
            <div className="hcard hcard-1">
              <div className="hcard-label">// Open Doubt</div>
              <div className="hcard-title">Redis caching issue in distributed microservices</div>
              <div className="hcard-domain">Backend Development • Advanced</div>
              <div className="hcard-experts">
                <div className="expert-avatars">
                  <span className="ea-1">RV</span>
                  <span className="ea-2">AK</span>
                  <span className="ea-3">PS</span>
                </div>
                <span className="hcard-experts-text">3 proposals received</span>
              </div>
            </div>
            <div className="hcard hcard-2">
              <div className="hcard-label">// Live Session</div>
              <div className="hcard-title">System Design: Building a URL Shortener at Scale</div>
              <div className="hcard-domain">System Design • 45 min</div>
              <div className="hcard-price">₹1,875</div>
            </div>
            <div className="hcard hcard-3">
              <div className="hcard-label">// Seminar Today</div>
              <div className="hcard-title">Machine Learning Algorithms: A Practical Deep Dive</div>
              <div className="hcard-domain">AI/ML • 90 min • 28 registered</div>
              <div className="hcard-price">FREE</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqItems, ...marqItems].map((item, i) => (
            <div key={i} className="marquee-item">{item}</div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-header fade-up">
          <div className="section-num">01</div>
          <div className="section-title-wrap">
            <div className="section-eyebrow">Platform Features</div>
            <div className="section-title">EVERYTHING<br/>YOU NEED</div>
          </div>
        </div>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div className="feature-card fade-up" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="feature-tag">{f.label}</div>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="section-header fade-up">
          <div className="section-num">02</div>
          <div className="section-title-wrap">
            <div className="section-eyebrow">The Process</div>
            <div className="section-title">HOW IT<br/>WORKS</div>
          </div>
        </div>
        <div className="steps-flow">
          {steps.map((s, i) => (
            <div className="step fade-up" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="step-num">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOMAINS */}
      <section className="domains-section" id="domains">
        <div className="section-header fade-up">
          <div className="section-num">03</div>
          <div className="section-title-wrap">
            <div className="section-eyebrow">Coverage</div>
            <div className="section-title">15+<br/>DOMAINS</div>
          </div>
        </div>
        <div className="domains-grid fade-up">
          {domains.map((d, i) => (
            <div
              key={i}
              className={`domain-chip ${activeChip === i ? "active" : ""}`}
              onClick={() => setActiveChip(i === activeChip ? null : i)}
            >{d}</div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div className="section-header fade-up">
          <div className="section-num">04</div>
          <div className="section-title-wrap">
            <div className="section-eyebrow">Session Packages</div>
            <div className="section-title">TRANSPARENT<br/>PRICING</div>
          </div>
        </div>
        <div className="pricing-grid">
          {[
            { dur: "30 Minutes", price: "1,250", desc: "Perfect for quick code reviews or specific bug fixes.", features: ["1 focused problem", "Screen sharing", "AI summary", "Chat support"], badge: null },
            { dur: "45 Minutes", price: "1,875", desc: "Concept explanation with guided debugging walk-through.", features: ["Deep concept dive", "Live code session", "AI summary + resources", "Replay recording"], badge: "Most Popular" },
            { dur: "60 Minutes", price: "2,500", desc: "Architecture reviews and comprehensive tutoring sessions.", features: ["Full architecture review", "Multi-problem sessions", "AI summary + action items", "Follow-up Q&A"], badge: null },
          ].map((p, i) => (
            <div key={i} className={`price-card fade-up ${p.badge ? "featured" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              {p.badge && <div className="price-badge">{p.badge}</div>}
              <div className="price-duration">{p.dur}</div>
              <div className="price-amount"><span>₹</span>{p.price}</div>
              <p className="price-desc">{p.desc}</p>
              <ul className="price-features">
                {p.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
              <a href="#join" className="price-cta">Book Session</a>
            </div>
          ))}
        </div>
      </section>

      {/* REPUTATION */}
      <section className="rep-section">
        <div className="section-header fade-up">
          <div className="section-num">05</div>
          <div className="section-title-wrap">
            <div className="section-eyebrow">Expert Growth</div>
            <div className="section-title">REPUTATION<br/>TIERS</div>
          </div>
        </div>
        <div className="rep-tiers">
          {[
            { level: "Novice", score: "0–100", perks: ["Resolve doubts", "Send proposals", "Basic dashboard", "Earn from sessions"], ds: "100" },
            { level: "Intermediate", score: "101–500", perks: ["Everything in Novice", "Host group discussions", "Priority in feed", "GD earnings"], ds: "500" },
            { level: "Advanced", score: "501–1000", perks: ["Everything in Intermediate", "Conduct live seminars", "Featured listing", "Seminar monetization"], ds: "1000" },
            { level: "Expert", score: "1000+", perks: ["Everything in Advanced", "Priority placement", "Featured expert badge", "Platform ambassador"], ds: "∞" },
          ].map((t, i) => (
            <div className="rep-tier fade-up" key={i} data-score={t.ds} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="rep-level">{t.level}</div>
              <div className="rep-score">Score: {t.score}</div>
              <ul className="rep-perks">
                {t.perks.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-header fade-up">
          <div className="section-num">06</div>
          <div className="section-title-wrap">
            <div className="section-eyebrow">Community Voices</div>
            <div className="section-title">REAL<br/>RESULTS</div>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card fade-up" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: t.color, color: "#000" }}>{t.initials}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="join">
        <div className="cta-bg-text">JOIN</div>
        <div className="cta-inner">
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>Ready to UNBLUR?</div>
            <div className="cta-title">STOP GOOGLING.<br/>START LEARNING.</div>
          </div>
          <div className="cta-actions">
            <a href="#" className="cta-btn-primary">I'm a Learner →</a>
            <a href="#" className="cta-btn-secondary">I'm an Expert →</a>
            <p style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.5)", fontFamily: "'Space Mono', monospace", textAlign: "center", lineHeight: 1.6 }}>
              Free to join. Experts keep 80-85% of earnings.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <a href="#" className="footer-logo">UNBLUR</a>
            <p className="footer-tagline">India's premier on-demand technical mentorship platform. Connecting learners with domain experts through AI-enhanced sessions, group discussions, and seminars.</p>
          </div>
          <div>
            <div className="footer-col-title">Platform</div>
            <ul className="footer-links">
              {["Post a Doubt", "Find Experts", "Group Discussions", "Seminars", "Pricing"].map((l, i) => <li key={i}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Experts</div>
            <ul className="footer-links">
              {["Become an Expert", "Reputation System", "Earnings", "Session Tools", "Expert Dashboard"].map((l, i) => <li key={i}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              {["About Us", "Blog", "Careers", "Privacy Policy", "Terms of Service"].map((l, i) => <li key={i}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 <span>UNBLUR</span>. Built for the curious minds of India.</div>
          <div className="footer-socials">
            <a href="#">in</a>
            <a href="#">tw</a>
            <a href="#">gh</a>
          </div>
        </div>
      </footer>
    </>
  );
}
