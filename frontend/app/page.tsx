"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Scholarship = { id: number; name: string; provider: string; country: string; degree_levels: string[]; funding_type: string; deadline: string; days_remaining: number | null; status: string; description: string };
type ApiResponse = { count: number; results: Scholarship[] };
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const funding: Record<string,string> = { FULLY_FUNDED:"Fully funded", PARTIALLY_FUNDED:"Partially funded", TUITION_ONLY:"Tuition only", STIPEND:"Stipend" };
const degree: Record<string,string> = { BACHELORS:"Bachelor's", MASTERS:"Master's", PHD:"PhD" };

function Logo(){return <span className="text-lg font-bold tracking-tight">Scholar<span className="text-blue-400">Track</span></span>;}
function Card({item}:{item:Scholarship}) {
  return <article className="glass-card rounded-2xl p-5">
    <p className="text-xs font-medium text-blue-400">{item.provider}</p>
    <h3 className="mt-1 text-base font-semibold">{item.name}</h3>
    <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-400">{item.description}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-300">{funding[item.funding_type] ?? item.funding_type}</span>
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-300">{item.degree_levels.map((v)=>degree[v] ?? v).join(", ")}</span>
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-slate-300">{item.country}</span>
    </div>
    <div className="mt-5 flex items-end justify-between border-t border-white/5 pt-4">
      <div><p className="text-[10px] uppercase tracking-wider text-slate-500">Deadline</p><p className="mt-1 text-xs">{item.deadline}</p><p className="mt-1 text-[11px] text-blue-300">{item.days_remaining === null ? "Closed" : item.days_remaining === 0 ? "Deadline today" : item.days_remaining + " days remaining"}</p></div>
      <Link href={"/scholarships/" + item.id} className="focus-ring rounded-xl border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-blue-500/40 hover:bg-blue-500/10">View Details</Link>
    </div>
  </article>;
}

export default function HomePage(){
  const [query,setQuery]=useState("");
  const [items,setItems]=useState<Scholarship[]>([]);
  const [count,setCount]=useState(0);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);

  useEffect(()=>{
    const controller=new AbortController();
    const timer=window.setTimeout(async()=>{
      setLoading(true); setError(false);
      try{
        const response=await fetch(API_BASE + "/api/scholarships/?q=" + encodeURIComponent(query),{credentials:"include",signal:controller.signal});
        if(!response.ok) throw new Error("request failed");
        const data=(await response.json()) as ApiResponse;
        setItems(data.results); setCount(data.count);
      }catch(err){
        if(err instanceof DOMException && err.name==="AbortError") return;
        setError(true); setItems([]); setCount(0);
      }finally{if(!controller.signal.aborted) setLoading(false);}
    },250);
    return()=>{window.clearTimeout(timer);controller.abort();};
  },[query]);

  return <main className="min-h-screen bg-[#0b0f19] text-white"><div className="bg-glow"/>
    <header className="glass-surface fixed inset-x-0 top-0 z-40 h-16 border-x-0 border-t-0"><div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"><Link href="/" className="focus-ring rounded-lg"><Logo/></Link><nav className="hidden gap-6 text-sm font-medium md:flex"><a href="#discover" className="border-b-2 border-blue-500 pb-0.5">Find Scholarships</a><Link href="/login" className="text-slate-400 hover:text-white">My Trackers</Link><a href="#resources" className="text-slate-400 hover:text-white">Resources</a></nav><Link href="/login" className="btn-primary rounded-xl px-3.5 py-2 text-xs font-semibold">Log In</Link></div></header>
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl space-y-6 pt-6 text-center"><div className="mx-auto inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">Scholarship Discovery &amp; Preparation Platform</div><h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">Find scholarships.<br/><span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Prepare with confidence.</span></h1><p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">Discover opportunities, understand requirements, save the ones that matter, and prepare before applying through official provider channels.</p><div className="mx-auto max-w-2xl"><input value={query} onChange={(e)=>setQuery(e.target.value)} className="st-search-input w-full rounded-2xl px-4 py-3.5 text-sm placeholder:text-slate-500" placeholder="Search scholarships, universities, fields, or countries..." aria-label="Search scholarships"/></div></section>
      <section className="my-14 grid grid-cols-2 gap-4 border-y border-white/5 py-4 md:grid-cols-4">{[["01 Discover","Find opportunities"],["02 Understand","Clear requirements"],["03 Save","Track deadlines"],["04 Prepare","Checklist focus"]].map(([step,title])=><div key={step} className="glass-surface rounded-xl border border-white/5 p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{step}</div><div className="mt-1.5 text-sm font-semibold">{title}</div><div className="mt-1 text-xs text-slate-400">Simple, focused scholarship preparation.</div></div>)}</section>
      <section id="discover" className="scroll-mt-24 space-y-6"><div><h2 className="text-xl font-bold">Featured Scholarships</h2><p className="text-sm text-slate-400">Published opportunities with upcoming deadlines.</p></div>
        <div className="text-xs text-slate-500">{loading ? "Loading..." : "Showing " + items.length + " of " + count}</div>
        {loading && <div className="grid gap-5 md:grid-cols-2">{[1,2,3,4].map((n)=><div key={n} className="glass-card rounded-2xl p-5"><div className="skeleton h-5 w-2/3 rounded"/><div className="skeleton mt-4 h-12 rounded"/><div className="skeleton mt-4 h-8 rounded"/></div>)}</div>}
        {!loading && error && <div className="glass-surface rounded-2xl p-10 text-center"><h3 className="text-sm font-semibold">Scholarships could not be loaded.</h3><p className="mt-2 text-xs text-slate-400">The discovery service is unavailable.</p></div>}
        {!loading && !error && items.length===0 && <div className="glass-surface rounded-2xl p-10 text-center"><h3 className="text-sm font-semibold">No scholarships found.</h3><p className="mt-2 text-xs text-slate-400">Published scholarships added through the admin will appear here.</p></div>}
        {!loading && !error && items.length>0 && <div className="grid gap-5 md:grid-cols-2">{items.map((item)=><Card key={item.id} item={item}/>)}</div>}
      </section>
      <section id="resources" className="glass-surface mt-16 rounded-2xl border border-white/10 p-6 sm:p-8"><div className="max-w-xl"><div className="text-xs font-semibold text-blue-400">OFFICIAL SOURCE FIRST</div><h3 className="mt-2 text-lg font-bold">Apply through the official provider.</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">ScholarTrack organizes scholarship information and preparation. Applications are completed on the official provider website.</p></div></section>
    </div>
    <footer className="glass-surface border-x-0 border-b-0"><div className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-500">ScholarTrack © 2026</div></footer>
  </main>;
}
