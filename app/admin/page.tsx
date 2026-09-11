"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  Mail,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Terminal,
  Activity,
  User,
  Calendar,
  Layers,
} from "lucide-react";
import { type MessageRecord } from "@/lib/db";

export default function AdminDashboard() {
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "replied" | "flagged">("all");
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<MessageRecord | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, replied: 0 });

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
        setStats({
          total: data.total || 0,
          pending: data.pendingCount || 0,
          replied: data.repliedCount || 0,
        });
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "pending" | "replied" | "flagged") => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        fetchMessages();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = messages.filter((m) => {
    if (filter !== "all" && m.status !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white p-4 sm:p-8 font-sans">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 text-xs font-mono-tech"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  Backend Control Panel
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech uppercase bg-[#bfff04]/10 text-[#bfff04] border border-[#bfff04]/30">
                  SQLite Dev.db
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono-tech mt-0.5">
                Gbodimowo Isaac • Communications & Lead Tracker Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchMessages}
              disabled={loading}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono-tech text-neutral-300 hover:text-white flex items-center gap-2 hover:border-[#bfff04]/40 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#bfff04]" : ""}`} />
              <span>Refresh Datastore</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10">
            <div className="text-[11px] font-mono-tech text-neutral-400 uppercase flex items-center justify-between">
              <span>Total Submissions</span>
              <Database className="w-4 h-4 text-[#bfff04]" />
            </div>
            <div className="text-2xl font-bold font-display text-white mt-2">
              {stats.total}
            </div>
            <div className="text-[11px] font-mono-tech text-neutral-500 mt-1">
              Persistent records
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10">
            <div className="text-[11px] font-mono-tech text-neutral-400 uppercase flex items-center justify-between">
              <span>Pending Action</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-display text-amber-400 mt-2">
              {stats.pending}
            </div>
            <div className="text-[11px] font-mono-tech text-neutral-500 mt-1">
              Awaiting review
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10">
            <div className="text-[11px] font-mono-tech text-neutral-400 uppercase flex items-center justify-between">
              <span>Replied Inquiries</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-display text-emerald-400 mt-2">
              {stats.replied}
            </div>
            <div className="text-[11px] font-mono-tech text-neutral-500 mt-1">
              Transmission processed
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/40 border border-white/10">
            <div className="text-[11px] font-mono-tech text-neutral-400 uppercase flex items-center justify-between">
              <span>Health Endpoint</span>
              <Activity className="w-4 h-4 text-[#00f0ff]" />
            </div>
            <div className="text-2xl font-bold font-display text-[#00f0ff] mt-2">
              200 OK
            </div>
            <a
              href="/api/health"
              target="_blank"
              className="text-[11px] font-mono-tech text-neutral-400 hover:text-white mt-1 block"
            >
              Inspect /api/health →
            </a>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900/50 border border-white/10 mb-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {(["all", "pending", "replied", "flagged"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech uppercase transition-all ${
                  filter === st
                    ? "bg-[#bfff04] text-black font-bold"
                    : "bg-neutral-900 text-neutral-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by sender, email, subject..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-black border border-neutral-800 text-xs font-mono-tech text-white focus:outline-none focus:border-[#bfff04]"
            />
          </div>
        </div>

        {/* Main Content Area: Messages Table & Detail Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Table (Col 7 or 12) */}
          <div className={`${selectedMessage ? "lg:col-span-7" : "lg:col-span-12"} transition-all`}>
            <div className="rounded-xl bg-neutral-950 border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 text-xs font-mono-tech text-neutral-400 flex items-center justify-between">
                <span>DATABASE TABLE: `messages` ({filtered.length} rows)</span>
                <span className="text-[10px] text-neutral-500">WAL mode enabled</span>
              </div>

              {filtered.length === 0 ? (
                <div className="p-12 text-center text-neutral-500 font-mono-tech text-xs">
                  {loading ? "Reading datastore..." : "No messages matching active filter."}
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {filtered.map((msg) => {
                    const isSelected = selectedMessage?.id === msg.id;
                    return (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`p-4 cursor-pointer transition-colors flex flex-wrap items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-neutral-900/90 border-l-4 border-l-[#bfff04]"
                            : "hover:bg-neutral-900/40"
                        }`}
                      >
                        <div className="space-y-1 max-w-md">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{msg.name}</span>
                            <span className="text-[11px] font-mono-tech text-neutral-400">
                              &lt;{msg.email}&gt;
                            </span>
                          </div>
                          <div className="text-xs text-neutral-300 font-medium">
                            {msg.subject}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1">
                            {msg.message}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2.5 py-0.5 rounded text-[10px] font-mono-tech uppercase font-semibold ${
                              msg.status === "replied"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                                : msg.status === "flagged"
                                ? "bg-rose-950 text-rose-400 border border-rose-500/30"
                                : "bg-amber-950 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {msg.status}
                          </span>
                          <span className="text-[10px] font-mono-tech text-neutral-500">
                            {new Date(msg.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Selected Message Detail Drawer (Col 5) */}
          {selectedMessage && (
            <div className="lg:col-span-5 rounded-xl bg-neutral-900/60 border border-white/15 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono-tech text-neutral-500">
                    Record ID: {selectedMessage.id}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedMessage(null)}
                    className="text-xs font-mono-tech text-neutral-400 hover:text-white"
                  >
                    Close Pane
                  </button>
                </div>

                <div>
                  <div className="text-lg font-bold text-white font-display">
                    {selectedMessage.subject}
                  </div>
                  <div className="text-xs font-mono-tech text-neutral-400 mt-1">
                    From: {selectedMessage.name} ({selectedMessage.email})
                  </div>
                  <div className="text-[11px] font-mono-tech text-neutral-500">
                    Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-white/10 font-mono-tech text-xs text-neutral-200 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>

                {/* Metadata details */}
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono-tech space-y-1 text-neutral-400">
                  <div>Client IP Hash: {selectedMessage.ipHash || "Internal"}</div>
                  <div>User Agent: {selectedMessage.userAgent || "Unknown"}</div>
                  <div>Referrer: {selectedMessage.referrer || "Direct"}</div>
                </div>
              </div>

              {/* Status Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="text-xs font-mono-tech text-neutral-400">Update Status:</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={updatingId === selectedMessage.id}
                    onClick={() => handleStatusChange(selectedMessage.id, "pending")}
                    className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-xs font-mono-tech"
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === selectedMessage.id}
                    onClick={() => handleStatusChange(selectedMessage.id, "replied")}
                    className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-xs font-mono-tech"
                  >
                    Mark Replied
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === selectedMessage.id}
                    onClick={() => handleStatusChange(selectedMessage.id, "flagged")}
                    className="px-2.5 py-1 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs font-mono-tech"
                  >
                    Flag
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
