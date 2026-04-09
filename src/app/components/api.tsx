import { projectId, publicAnonKey } from "/utils/supabase/info";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-bd12afe2`;

async function post(path: string, body: Record<string, any>) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

async function get(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Authorization: `Bearer ${publicAnonKey}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  submitDemoRequest: (body: {
    name: string;
    email: string;
    company: string;
    phone?: string;
    machines?: string;
    message?: string;
  }) => post("/demo-request", body),

  submitContact: (body: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => post("/contact", body),

  subscribeNewsletter: (email: string) => post("/newsletter", { email }),

  trackPricingClick: (plan: string, email?: string) =>
    post("/pricing-click", { plan, email }),

  // Admin
  getDemoRequests: () => get("/admin/demo-requests"),
  getContacts: () => get("/admin/contacts"),
  getNewsletters: () => get("/admin/newsletters"),
  getPricingClicks: () => get("/admin/pricing-clicks"),
  getStats: () => get("/admin/stats"),
};
