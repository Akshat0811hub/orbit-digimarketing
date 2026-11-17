"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/contact";
import { services } from "@/data/content";
export default function ContactForm() {
  const [status, setStatus] = useState(""),
    [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: "", company: "" },
  });
  const submit = async (data: ContactValues) => {
    setStatus("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok)
        throw Error(result.error || "Something went wrong. Please try again.");
      setSent(true);
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "Unable to send. Please try again.",
      );
    }
  };
  if (sent)
    return (
      <div className="form-success" role="status">
        <Check size={48} />
        <h2>
          Good things
          <br />
          start here.
        </h2>
        <p>Your brief has landed in our inbox. We’ll be in touch soon.</p>
        <button className="pill lime" onClick={() => setSent(false)}>
          Send another enquiry ↗
        </button>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="form-grid">
        {(["name", "email", "company"] as const).map((n) => (
          <label key={n}>
            {n === "name"
              ? "Your name *"
              : n === "email"
                ? "Email address *"
                : "Company / brand"}
            <input
              {...register(n)}
              type={n === "email" ? "email" : "text"}
              autoComplete={n === "company" ? "organization" : n}
              placeholder={
                n === "name"
                  ? "Alex Smith"
                  : n === "email"
                    ? "alex@yourbrand.com"
                    : "Your next big thing"
              }
              aria-invalid={!!errors[n]}
              aria-describedby={errors[n] ? `${n}-error` : undefined}
            />
            {errors[n] && (
              <small id={`${n}-error`} className="form-error">
                {errors[n]?.message}
              </small>
            )}
          </label>
        ))}
        <label>
          Budget range *
          <select {...register("budget")} aria-invalid={!!errors.budget}>
            <option value="">Select your range</option>
            {[
              "Under ₹2 lakh",
              "₹2–5 lakh",
              "₹5–10 lakh",
              "₹10 lakh+",
              "Let’s figure it out",
            ].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          {errors.budget && (
            <small className="form-error">{errors.budget.message}</small>
          )}
        </label>
      </div>
      <label>
        What can we help with? *
        <select {...register("service")} aria-invalid={!!errors.service}>
          <option value="">Choose a starting point</option>
          {services.map((s) => (
            <option key={s.slug}>{s.name}</option>
          ))}
          <option>A little of everything</option>
        </select>
        {errors.service && (
          <small className="form-error">{errors.service.message}</small>
        )}
      </label>
      <label>
        Tell us about your idea *
        <textarea
          {...register("message")}
          rows={4}
          placeholder="The ambition, the challenge, the wild idea. We’re all ears."
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <small className="form-error">{errors.message.message}</small>
        )}
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input {...register("website")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-privacy">
        We use these details only to respond to your enquiry. No mailing lists,
        no unsolicited updates.
      </p>
      <button className="pill lime" disabled={isSubmitting}>
        {isSubmitting ? "Sending your idea…" : "Let’s make it happen"}
        <ArrowUpRight size={18} />
      </button>
      {status && (
        <p role="alert" className="form-error">
          {status}
        </p>
      )}
    </form>
  );
}
