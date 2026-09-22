import Link from "next/link";
export function Logo({dark=false}:{dark?:boolean}){return <Link href="/" className={"font-semibold tracking-tight text-xl "+(dark?"text-white":"text-slate-950")}>Scholar<span className="text-blue-500">Track</span></Link>}
