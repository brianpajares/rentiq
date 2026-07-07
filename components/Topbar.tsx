import Link from "next/link";
import { BarChart3 } from "lucide-react";

export function Topbar() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark">
          <BarChart3 size={19} />
        </span>
        <span>RentIQ</span>
      </Link>
      <nav className="nav">
        <Link href="/app/nueva">Nueva evaluacion</Link>
        <Link href="/app/mapa">Mapa</Link>
        <Link href="/metodologia">Metodologia</Link>
        <Link className="button primary" href="/app/nueva">
          Comparar
        </Link>
      </nav>
    </header>
  );
}
