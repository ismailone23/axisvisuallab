"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fields)),
      });

      if (!response.ok) throw new Error("Could not send message");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={styles.contactForm} id="contact-form" onSubmit={handleSubmit}>
      <div className={styles.formPair}>
        <label className={styles.formField}>
          <span>Your name *</span>
          <input name="name" type="text" autoComplete="name" placeholder="How should we call you?" required maxLength={100} />
        </label>
        <label className={styles.formField}>
          <span>Email address *</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
        </label>
      </div>
      <label className={styles.formField}>
        <span>What do you need help with?</span>
        <select name="service" defaultValue="">
          <option value="">Select a service (optional)</option>
          <option value="Website or app">Website or app</option>
          <option value="Video editing">Video editing</option>
          <option value="Graphic design">Graphic design</option>
          <option value="Something else">Something else</option>
        </select>
      </label>
      <label className={styles.formField}>
        <span>Tell us about your project *</span>
        <textarea name="message" placeholder="A little about your idea, timeline, or what you have in mind..." required minLength={10} maxLength={5000} rows={5} />
      </label>
      <div className={styles.honeypot} aria-hidden="true">
        <label>Leave this field empty<input name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className={styles.formEnd}>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send your message"} <span aria-hidden="true">↗</span>
        </button>
        <p className={styles.formStatus} role={status === "error" ? "alert" : "status"} aria-live="polite">
          {status === "success" && "Thanks for reaching out. We’ll get back to you soon."}
          {status === "error" && "Your message couldn’t be sent. Please try again or email us directly."}
        </p>
      </div>
    </form>
  );
}
