import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { ChevronRight, Newspaper, User } from "lucide-react";
import {
  EXPLORE_CATEGORIES,
  getArticlesByCategory,
  getHomeFeedArticles,
  type Article,
} from "@/lib/explore-data";
import { getSession } from "@/lib/session";
import { getProfile } from "@/lib/profile";
import { initialsFromName } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "L'Étudiant — Explorer" },
      {
        name: "description",
        content: "Actualités et formations : grandes écoles, universités, prépas.",
      },
    ],
  }),
  component: ExploreHome,
});

function formatArticleDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function ArticleSlider({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-thin">
      {articles.map((a) => (
        <Link
          key={a.id}
          to="/explore/$categoryId/article/$articleId"
          params={{ categoryId: a.categoryId, articleId: a.id }}
          className="snap-start shrink-0 w-[min(88vw,300px)] tap-feedback rounded-2xl bg-card border border-border p-4 shadow-card block text-left"
        >
          {a.schoolTag && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
              {a.schoolTag}
            </span>
          )}
          <p className="mt-1 font-semibold text-sm leading-snug line-clamp-3">{a.title}</p>
          <p className="mt-2 text-[11px] text-muted-foreground line-clamp-2">{a.excerpt}</p>
          <p className="mt-3 text-[10px] text-muted-foreground">
            {formatArticleDate(a.publishedAt)}
          </p>
        </Link>
      ))}
    </div>
  );
}

function ExploreHome() {
  const [initials, setInitials] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    const profile = getProfile();
    if (session.kind === "registered") {
      setInitials(initialsFromName(profile.firstName, profile.lastName, "E"));
    } else if (session.kind === "guest") {
      setInitials(initialsFromName(undefined, undefined, "GV"));
    } else {
      setInitials(null);
    }
  }, []);

  const homeArticles = getHomeFeedArticles();

  return (
    <AppShell>
      <div className="px-5 pt-4 pb-6 animate-fade-in space-y-8">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
              E
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Explorer</p>
              <h1 className="text-lg font-bold leading-tight truncate">Formations & écoles</h1>
            </div>
          </div>
          <Link
            to="/welcome"
            className="tap-feedback flex items-center gap-2 rounded-full bg-muted pl-3 pr-3 py-2 text-xs font-semibold text-foreground shrink-0"
          >
            {initials ? (
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">
                {initials}
              </span>
            ) : (
              <User className="w-4 h-4 text-muted-foreground" />
            )}
            Compte
          </Link>
        </header>

        <p className="text-sm text-muted-foreground -mt-4">
          Parcours les actualités récentes et découvre les formations par type d’établissement.
        </p>

        {/* À la une — toutes catégories */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-primary" />
              <h2 className="text-base font-bold">À la une</h2>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Toutes filières
            </span>
          </div>
          <ArticleSlider articles={homeArticles} />
          <p className="text-[11px] text-muted-foreground mt-2 px-0.5">
            Du plus récent au plus ancien (défilement horizontal).
          </p>
        </section>

        {EXPLORE_CATEGORIES.map((cat) => {
          const arts = getArticlesByCategory(cat.id);
          return (
            <section key={cat.id}>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold">{cat.title}</h2>
                <Link
                  to="/explore/$categoryId"
                  params={{ categoryId: cat.id }}
                  className="tap-feedback flex items-center gap-0.5 text-xs font-semibold text-primary"
                >
                  Tout voir
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{cat.subtitle}</p>
              <ArticleSlider articles={arts} />
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
