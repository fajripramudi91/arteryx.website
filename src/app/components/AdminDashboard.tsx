import { useState, useEffect } from "react";
import { api } from "./api";
import { BarChart3, Users, Mail, MousePointerClick, RefreshCw, ArrowLeft, Inbox, Clock } from "lucide-react";
import { motion } from "motion/react";

type Tab = "overview" | "demos" | "contacts" | "newsletters" | "pricing";

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<any>(null);
  const [demos, setDemos] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [pricingClicks, setPricingClicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, d, c, n, p] = await Promise.all([
        api.getStats(),
        api.getDemoRequests(),
        api.getContacts(),
        api.getNewsletters(),
        api.getPricingClicks(),
      ]);
      setStats(s.stats);
      setDemos(d.data || []);
      setContacts(c.data || []);
      setNewsletters(n.data || []);
      setPricingClicks(p.data || []);
    } catch (err) {
      console.log("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const statCards = [
    { label: "Demo Requests", value: stats?.demoRequests || 0, icon: Users, color: "bg-orange-500", tab: "demos" as Tab },
    { label: "Contact Messages", value: stats?.contactMessages || 0, icon: Mail, color: "bg-blue-500", tab: "contacts" as Tab },
    { label: "Newsletter Subs", value: stats?.newsletterSubscribers || 0, icon: Inbox, color: "bg-green-500", tab: "newsletters" as Tab },
    { label: "Pricing Clicks", value: stats?.pricingClicks || 0, icon: MousePointerClick, color: "bg-purple-500", tab: "pricing" as Tab },
  ];

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "demos", label: "Demo Requests" },
    { id: "contacts", label: "Contact Messages" },
    { id: "newsletters", label: "Newsletters" },
    { id: "pricing", label: "Pricing Clicks" },
  ];

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch { return d; }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className="bg-black text-white border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1
                className="text-xl tracking-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
              >
                ARTERYX <span className="text-orange-500">Admin</span>
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Dashboard</p>
            </div>
          </div>
          <motion.button
            onClick={fetchAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </motion.button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-8">
        {/* Tabs */}
        <div className="flex gap-0 border border-gray-200 mb-8 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3 text-xs uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                tab === t.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            {/* Overview */}
            {tab === "overview" && (
              <div>
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {statCards.map((s) => {
                    const Icon = s.icon;
                    return (
                      <motion.div
                        key={s.label}
                        whileHover={{ y: -4, boxShadow: "0 8px 25px rgba(0,0,0,0.08)" }}
                        onClick={() => setTab(s.tab)}
                        className="bg-white border border-gray-200 p-6 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 ${s.color} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <BarChart3 className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors" />
                        </div>
                        <p
                          className="text-3xl tracking-tighter text-black"
                          style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                        >
                          {s.value}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent activity */}
                <div className="bg-white border border-gray-200 p-6">
                  <h3
                    className="text-sm text-black mb-4"
                    style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
                  >
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[...demos.slice(0, 3).map(d => ({ type: "Demo Request", name: d.name, email: d.email, date: d.createdAt, color: "bg-orange-500" })),
                      ...contacts.slice(0, 3).map(c => ({ type: "Contact", name: c.name, email: c.email, date: c.createdAt, color: "bg-blue-500" })),
                    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6).map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                        <div className={`w-2 h-2 ${item.color} rounded-full flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-black truncate">
                            <span className="font-medium">{item.name}</span> — {item.type}
                          </p>
                          <p className="text-[10px] text-gray-400">{item.email}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.date)}
                        </div>
                      </div>
                    ))}
                    {demos.length === 0 && contacts.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-8">No activity yet. Submissions will appear here.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Demo Requests */}
            {tab === "demos" && (
              <div className="bg-white border border-gray-200">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-sm text-black" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
                    Demo Requests ({demos.length})
                  </h3>
                </div>
                {demos.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-12">No demo requests yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-200 text-left">
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Name</th>
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Email</th>
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Company</th>
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Phone</th>
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Machines</th>
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {demos.map((d, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-black font-medium">{d.name}</td>
                            <td className="px-4 py-3 text-gray-600">{d.email}</td>
                            <td className="px-4 py-3 text-gray-600">{d.company}</td>
                            <td className="px-4 py-3 text-gray-600">{d.phone || "-"}</td>
                            <td className="px-4 py-3 text-gray-600">{d.machines || "-"}</td>
                            <td className="px-4 py-3 text-gray-400">{formatDate(d.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Contact Messages */}
            {tab === "contacts" && (
              <div className="bg-white border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm text-black" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
                    Contact Messages ({contacts.length})
                  </h3>
                </div>
                {contacts.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-12">No contact messages yet.</p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {contacts.map((c, i) => (
                      <div key={i} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-xs text-black font-medium">{c.name}</span>
                            <span className="text-[10px] text-gray-400 ml-2">{c.email}</span>
                          </div>
                          <span className="text-[10px] text-gray-400">{formatDate(c.createdAt)}</span>
                        </div>
                        {c.subject && <p className="text-xs text-gray-600 font-medium mb-1">{c.subject}</p>}
                        <p className="text-xs text-gray-500 leading-relaxed">{c.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Newsletters */}
            {tab === "newsletters" && (
              <div className="bg-white border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm text-black" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
                    Newsletter Subscribers ({newsletters.length})
                  </h3>
                </div>
                {newsletters.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-12">No subscribers yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-200 text-left">
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Email</th>
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Subscribed At</th>
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsletters.map((n, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-black">{n.email}</td>
                            <td className="px-4 py-3 text-gray-400">{formatDate(n.subscribedAt)}</td>
                            <td className="px-4 py-3">
                              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 uppercase tracking-wider">Active</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Pricing Clicks */}
            {tab === "pricing" && (
              <div className="bg-white border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm text-black" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
                    Pricing Clicks ({pricingClicks.length})
                  </h3>
                </div>
                {pricingClicks.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-12">No pricing clicks tracked yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-200 text-left">
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Plan</th>
                          <th className="px-4 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-medium">Clicked At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pricingClicks.map((p, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <span className={`text-[10px] px-2 py-0.5 uppercase tracking-wider ${
                                p.plan === "Standard" ? "bg-orange-100 text-orange-700" :
                                p.plan === "Enterprise" ? "bg-purple-100 text-purple-700" :
                                "bg-gray-100 text-gray-700"
                              }`}>
                                {p.plan}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-400">{formatDate(p.clickedAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
