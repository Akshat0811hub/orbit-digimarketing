"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/contact";
import { services } from "@/data/content";
export default function ContactForm() {
  const [status, setStatus] = useState(""),
    [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { website: "", company: "" },
  });
  // Read the service link after hydration without opting the page into SSR.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const selected = services.find((service) => service.slug === slug);
    if (selected) setValue("service", selected.name);
  }, [setValue]);
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
        <p>
          Your enquiry has landed in our inbox. We’ll be in touch to discuss
          your business goals.
        </p>
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
                : "Business name"}
            <input
              {...register(n)}
              type={n === "email" ? "email" : "text"}
              autoComplete={n === "company" ? "organization" : n}
              placeholder={
                n === "name"
                  ? "Alex Smith"
                  : n === "email"
                    ? "alex@yourbrand.com"
                    : "Your business or organisation"
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
          Estimated project / monthly budget *
          <select {...register("budget")} aria-invalid={!!errors.budget}>
            <option value="">Select your range</option>
            {[
              "Under ₹25,000",
              "₹25,000–50,000",
              "₹50,000–2 lakh",
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
          <option>A complete digital marketing plan</option>
        </select>
        {errors.service && (
          <small className="form-error">{errors.service.message}</small>
        )}
      </label>
      <label>
        What would you like to improve? *
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Share your website URL, what your business does, and your goal—more search visibility, a website redesign, or better leads."
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
        {isSubmitting ? "Sending your enquiry…" : "Let’s discuss your business"}
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
