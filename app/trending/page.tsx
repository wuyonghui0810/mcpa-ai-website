"use client";

import { useEffect, useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { 
  ExternalLink, 
  History,
  Lightbulb,
  Languages
} from "lucide-react";

interface TrendingRow {
  repo: string;
  lang: string;
  delta: number;
  tag: string;
  intro: string;
  facts: string[];
}

interface TrendingSection {
  key: "today" | "week" | "month";
  label: string;
  sub: string;
  rows: TrendingRow[];
}

interface TrendingReport {
  period_date: string;
  fetch_note: string;
  foot_note: string;
  sections: TrendingSection[];
  insight: string[];
}

interface IndexMeta {
  available_dates: string[];
  latest: string;
}

export default function TrendingPage() {
  const [indexMeta, setIndexMeta] = useState<IndexMeta | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [report, setReport] = useState<TrendingReport | null>(null);
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">("week");
  const [loading, setLoading] = useState(true);

  // 1. 加载索引
  useEffect(() => {
    fetch("/trending/index.json")
      .then((res) => res.json())
      .then((data: IndexMeta) => {
        setIndexMeta(data);
        if (data.latest) {
          setCurrentDate(data.latest);
        }
      })
      .catch((err) => console.error("Failed to load index:", err));
  }, []);

  // 2. 加载选定期数与语言的报表数据
  useEffect(() => {
    if (!currentDate) return;
    setLoading(true);
    const dataUrl = lang === "en" 
      ? `/trending/${currentDate}.en.json` 
      : `/trending/${currentDate}.json`;

    fetch(dataUrl)
      .then(async (res) => {
        if (!res.ok) {
          // 回退逻辑：如果英文未生成，降级到默认 json
          return fetch(`/trending/${currentDate}.json`).then((r) => r.json());
        }
        return res.json();
      })
      .then((data: TrendingReport) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load trending data:", err);
        setLoading(false);
      });
  }, [currentDate, lang]);

  // 计算多榜同现映射
  const crossMap = useMemo(() => {
    if (!report) return {};
    const map: Record<string, Record<string, number>> = {};
    for (const sec of report.sections) {
      sec.rows.forEach((r, idx) => {
        if (!map[r.repo]) map[r.repo] = {};
        map[r.repo][sec.label] = idx + 1;
      });
    }
    return map;
  }, [report]);

  // 统计概览
  const stats = useMemo(() => {
    if (!report) return { uniqueCount: 0, todayDelta: 0, weekDelta: 0, monthDelta: 0 };
    const allRepos = report.sections.flatMap((s) => s.rows.map((r) => r.repo));
    const uniqueCount = new Set(allRepos).size;
    const todayDelta = report.sections.find((s) => s.key === "today")?.rows.reduce((sum, r) => sum + r.delta, 0) || 0;
    const weekDelta = report.sections.find((s) => s.key === "week")?.rows.reduce((sum, r) => sum + r.delta, 0) || 0;
    const monthDelta = report.sections.find((s) => s.key === "month")?.rows.reduce((sum, r) => sum + r.delta, 0) || 0;
    return { uniqueCount, todayDelta, weekDelta, monthDelta };
  }, [report]);

  const activeSection = report?.sections.find((s) => s.key === activeTab);

  const t = {
    badge: lang === "en" ? "MCPA Weekly Radar" : "MCPA 每周雷达",
    title: lang === "en" ? "GitHub Trending Weekly" : "GitHub Trending 周报",
    subtitle: lang === "en" 
      ? "Tracking open-source developer momentum, agent architectures, and production-grade discoveries every week."
      : "每周一自动深度追踪开源社区焦点，结构化提炼核心能力、技术架构与生产级实证。",
    selectPeriod: lang === "en" ? "Issue:" : "查看期数:",
    latestTag: lang === "en" ? "(Latest)" : "(最新期)",
    statUnique: lang === "en" ? "Unique Projects" : "独立项目 (去重)",
    statToday: lang === "en" ? "Today's TOP8" : "今日 TOP8 爆发",
    statWeek: lang === "en" ? "Weekly TOP8" : "本周 TOP8 新增",
    statMonth: lang === "en" ? "Monthly TOP8" : "本月 TOP8 沉淀",
    unitRepos: lang === "en" ? "repos" : "个",
    unitStars: "stars",
    unitPeriod: lang === "en" ? "stars / period" : "stars / 时段",
    loading: lang === "en" ? "Loading radar report..." : "正在加载周报数据...",
    insightsTitle: lang === "en" ? "Weekly Engineering Insights" : "本期深度洞察 (Insights)",
    alsoIn: lang === "en" ? "Also in" : "同现",
    notFound: lang === "en" ? "No report data found for this period." : "未能找到该期周报数据",
    footerIndex: lang === "en" ? "⚡ MCPA.ai Automated Full-Index" : "⚡ MCPA.ai 自动化全量索引",
  };

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      {/* Header Banner */}
      <section className="bg-mi-gray border-b border-mi-border py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-mi-border text-xs font-medium text-mi-text mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-mi-orange animate-pulse" />
                <span>{t.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-mi-black tracking-tight mb-2">
                {t.title}
              </h1>
              <p className="text-base text-mi-text max-w-xl">
                {t.subtitle}
              </p>
            </div>

            {/* 控制器组合：语言切换 + 期数选择器 */}
            <div className="flex flex-wrap items-center gap-3">
              {/* 中英文切换 Tab */}
              <div className="inline-flex items-center bg-white p-1 rounded-xl border border-mi-border shadow-sm text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    lang === "en"
                      ? "bg-mi-black text-white shadow-xs"
                      : "text-mi-muted hover:text-mi-black"
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang("zh")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    lang === "zh"
                      ? "bg-mi-black text-white shadow-xs"
                      : "text-mi-muted hover:text-mi-black"
                  }`}
                >
                  <span>中文</span>
                </button>
              </div>

              {/* 期数选择器 */}
              {indexMeta && indexMeta.available_dates.length > 0 && (
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-mi-border shadow-sm text-sm">
                  <History className="w-4 h-4 text-mi-muted" />
                  <span className="text-mi-muted text-xs">{t.selectPeriod}</span>
                  <select
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="bg-transparent font-medium text-mi-black outline-none cursor-pointer pr-2"
                  >
                    {indexMeta.available_dates.map((date) => (
                      <option key={date} value={date}>
                        {date} {date === indexMeta.latest ? t.latestTag : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* 核心指标统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-4 rounded-2xl border border-mi-border shadow-sm">
              <div className="text-xs text-mi-muted font-medium">{t.statUnique}</div>
              <div className="text-2xl font-bold text-mi-black mt-1">
                {stats.uniqueCount} <span className="text-xs font-normal text-mi-muted">{t.unitRepos}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-mi-border shadow-sm">
              <div className="text-xs text-mi-muted font-medium">{t.statToday}</div>
              <div className="text-2xl font-bold text-mi-orange mt-1">
                +{stats.todayDelta.toLocaleString()} <span className="text-xs font-normal text-mi-muted">{t.unitStars}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-mi-border shadow-sm">
              <div className="text-xs text-mi-muted font-medium">{t.statWeek}</div>
              <div className="text-2xl font-bold text-mi-orange mt-1">
                +{stats.weekDelta.toLocaleString()} <span className="text-xs font-normal text-mi-muted">{t.unitStars}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-mi-border shadow-sm">
              <div className="text-xs text-mi-muted font-medium">{t.statMonth}</div>
              <div className="text-2xl font-bold text-mi-black mt-1">
                +{stats.monthDelta.toLocaleString()} <span className="text-xs font-normal text-mi-muted">{t.unitStars}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="text-center py-20 text-mi-muted">{t.loading}</div>
        ) : report ? (
          <div className="space-y-10">
            {/* 本期看点 (Insights) */}
            {report.insight && report.insight.length > 0 && (
              <div className="bg-orange-50/50 border border-orange-200/80 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-mi-orange text-white flex items-center justify-center">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-mi-black">{t.insightsTitle}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.insight.map((ins, i) => (
                    <div key={i} className="text-sm text-mi-text bg-white/80 p-3.5 rounded-xl border border-orange-100 leading-relaxed">
                      <div dangerouslySetInnerHTML={{ 
                        __html: ins.replace(/\*\*(.*?)\*\*/g, '<strong class="text-mi-black font-semibold">$1</strong>') 
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 榜单切换 Tabs */}
            <div className="flex items-center justify-between border-b border-mi-border pb-4">
              <div className="flex items-center gap-2">
                {(["today", "week", "month"] as const).map((tabKey) => {
                  const s = report.sections.find((sec) => sec.key === tabKey);
                  if (!s) return null;
                  const isActive = activeTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setActiveTab(tabKey)}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                        isActive
                          ? "bg-mi-black text-white shadow-sm"
                          : "text-mi-text hover:text-mi-black hover:bg-mi-gray"
                      }`}
                    >
                      {s.label} ({s.sub})
                    </button>
                  );
                })}
              </div>

              <div className="hidden sm:block text-xs text-mi-muted">
                {report.fetch_note}
              </div>
            </div>

            {/* 榜单条目列表 */}
            {activeSection && (
              <div className="space-y-4">
                {activeSection.rows.map((row, idx) => {
                  const crossList = crossMap[row.repo] || {};
                  const otherCross = Object.entries(crossList).filter(
                    ([lbl]) => lbl !== activeSection.label
                  );

                  return (
                    <div
                      key={row.repo}
                      className="group bg-white rounded-2xl border border-mi-border p-5 hover:border-mi-orange/40 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <span className="font-mono text-base font-bold text-mi-muted w-6 text-center pt-0.5">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <a
                                href={`https://github.com/${row.repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-bold text-mi-black hover:text-mi-orange transition-colors flex items-center gap-1"
                              >
                                <span>{row.repo}</span>
                                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                              </a>

                              {/* 语言 Tag */}
                              {row.lang && (
                                <span className="px-2 py-0.5 text-xs bg-mi-gray text-mi-text rounded-md font-mono border border-mi-border">
                                  {row.lang}
                                </span>
                              )}

                              {/* 业务 Tag */}
                              {row.tag && (
                                <span className="px-2 py-0.5 text-xs bg-orange-50 text-mi-orange rounded-md font-medium border border-orange-100">
                                  {row.tag}
                                </span>
                              )}

                              {/* 跨榜同现 Chip */}
                              {otherCross.map(([label, rk]) => (
                                <span
                                  key={label}
                                  className="px-2 py-0.5 text-[11px] bg-blue-50 text-blue-600 rounded-full border border-blue-100 font-medium"
                                >
                                  {t.alsoIn} {label} #{rk}
                                </span>
                              ))}
                            </div>

                            {/* 简介 Intro */}
                            <p className="text-sm text-mi-text mt-2 leading-relaxed">
                              {row.intro}
                            </p>

                            {/* 核心事实 Facts */}
                            {row.facts && row.facts.length > 0 && (
                              <div className="mt-3.5 space-y-1.5 bg-mi-gray/60 p-3.5 rounded-xl border border-mi-border/60">
                                {row.facts.map((fact, fIdx) => (
                                  <div key={fIdx} className="text-xs text-mi-text flex items-start gap-2">
                                    <span className="text-mi-orange font-bold">•</span>
                                    <span className="leading-relaxed">{fact}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Star 增长指标 */}
                        <div className="text-right shrink-0">
                          <div className="inline-flex items-center gap-1 font-mono font-bold text-mi-orange text-base sm:text-lg">
                            <span>▲</span>
                            <span>{row.delta.toLocaleString()}</span>
                          </div>
                          <div className="text-[11px] text-mi-muted">{t.unitPeriod}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            <div className="pt-6 border-t border-mi-border flex flex-col sm:flex-row items-center justify-between text-xs text-mi-muted gap-2">
              <div>{report.foot_note}</div>
              <div>{t.footerIndex}</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-mi-muted">{t.notFound}</div>
        )}
      </div>
    </main>
  );
}
