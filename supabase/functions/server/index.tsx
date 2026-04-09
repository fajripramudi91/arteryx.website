import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-bd12afe2/health", (c) => {
  return c.json({ status: "ok" });
});

// ========================================
// DEMO REQUEST
// ========================================
app.post("/make-server-bd12afe2/demo-request", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, phone, machines, message } = body;

    if (!name || !email || !company) {
      return c.json({ error: "Missing required fields: name, email, company" }, 400);
    }

    const id = `demo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const data = {
      id,
      name,
      email,
      company,
      phone: phone || "",
      machines: machines || "",
      message: message || "",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    await kv.set(id, data);
    console.log(`Demo request saved: ${id} from ${email}`);
    return c.json({ success: true, id });
  } catch (err) {
    console.log(`Error saving demo request: ${err}`);
    return c.json({ error: `Failed to save demo request: ${err}` }, 500);
  }
});

// ========================================
// CONTACT FORM
// ========================================
app.post("/make-server-bd12afe2/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields: name, email, message" }, 400);
    }

    const id = `contact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const data = {
      id,
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      status: "unread",
      createdAt: new Date().toISOString(),
    };

    await kv.set(id, data);
    console.log(`Contact message saved: ${id} from ${email}`);
    return c.json({ success: true, id });
  } catch (err) {
    console.log(`Error saving contact message: ${err}`);
    return c.json({ error: `Failed to save contact message: ${err}` }, 500);
  }
});

// ========================================
// NEWSLETTER SUBSCRIPTION
// ========================================
app.post("/make-server-bd12afe2/newsletter", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const id = `newsletter_${email.replace(/[^a-zA-Z0-9]/g, "_")}`;
    
    // Check if already subscribed
    const existing = await kv.get(id);
    if (existing) {
      return c.json({ success: true, message: "Already subscribed" });
    }

    const data = {
      id,
      email,
      subscribedAt: new Date().toISOString(),
      active: true,
    };

    await kv.set(id, data);
    console.log(`Newsletter subscription saved: ${email}`);
    return c.json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    console.log(`Error saving newsletter subscription: ${err}`);
    return c.json({ error: `Failed to subscribe: ${err}` }, 500);
  }
});

// ========================================
// PRICING CLICK TRACKING
// ========================================
app.post("/make-server-bd12afe2/pricing-click", async (c) => {
  try {
    const body = await c.req.json();
    const { plan, email } = body;

    if (!plan) {
      return c.json({ error: "Plan name is required" }, 400);
    }

    const id = `pricing_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const data = {
      id,
      plan,
      email: email || "anonymous",
      clickedAt: new Date().toISOString(),
    };

    await kv.set(id, data);
    console.log(`Pricing click tracked: ${plan}`);
    return c.json({ success: true });
  } catch (err) {
    console.log(`Error tracking pricing click: ${err}`);
    return c.json({ error: `Failed to track pricing click: ${err}` }, 500);
  }
});

// ========================================
// ADMIN: GET ALL SUBMISSIONS
// ========================================
app.get("/make-server-bd12afe2/admin/demo-requests", async (c) => {
  try {
    const data = await kv.getByPrefix("demo_");
    const sorted = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return c.json({ success: true, data: sorted, count: sorted.length });
  } catch (err) {
    console.log(`Error fetching demo requests: ${err}`);
    return c.json({ error: `Failed to fetch demo requests: ${err}` }, 500);
  }
});

app.get("/make-server-bd12afe2/admin/contacts", async (c) => {
  try {
    const data = await kv.getByPrefix("contact_");
    const sorted = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return c.json({ success: true, data: sorted, count: sorted.length });
  } catch (err) {
    console.log(`Error fetching contacts: ${err}`);
    return c.json({ error: `Failed to fetch contacts: ${err}` }, 500);
  }
});

app.get("/make-server-bd12afe2/admin/newsletters", async (c) => {
  try {
    const data = await kv.getByPrefix("newsletter_");
    return c.json({ success: true, data, count: data.length });
  } catch (err) {
    console.log(`Error fetching newsletters: ${err}`);
    return c.json({ error: `Failed to fetch newsletters: ${err}` }, 500);
  }
});

app.get("/make-server-bd12afe2/admin/pricing-clicks", async (c) => {
  try {
    const data = await kv.getByPrefix("pricing_");
    const sorted = data.sort((a: any, b: any) => new Date(b.clickedAt).getTime() - new Date(a.clickedAt).getTime());
    return c.json({ success: true, data: sorted, count: sorted.length });
  } catch (err) {
    console.log(`Error fetching pricing clicks: ${err}`);
    return c.json({ error: `Failed to fetch pricing clicks: ${err}` }, 500);
  }
});

app.get("/make-server-bd12afe2/admin/stats", async (c) => {
  try {
    const [demos, contacts, newsletters, pricingClicks] = await Promise.all([
      kv.getByPrefix("demo_"),
      kv.getByPrefix("contact_"),
      kv.getByPrefix("newsletter_"),
      kv.getByPrefix("pricing_"),
    ]);
    return c.json({
      success: true,
      stats: {
        demoRequests: demos.length,
        contactMessages: contacts.length,
        newsletterSubscribers: newsletters.length,
        pricingClicks: pricingClicks.length,
      },
    });
  } catch (err) {
    console.log(`Error fetching admin stats: ${err}`);
    return c.json({ error: `Failed to fetch stats: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);
