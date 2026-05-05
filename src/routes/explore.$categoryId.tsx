import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ArrowLeft, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EXPLORE_CATEGORIES,
  getArticlesByCategory,
  getFormationsByCategory,
  isExploreCategoryId,
} from "@/lib/explore-data";
import { FormationFavoriteButton } from "@/components/FormationFavoriteButton";

export const Route = createFileRoute("/explore/$categoryId")({
  head: ({ params }) => ({
    meta: [
      { title: `Explorer — ${params.categoryId}` },
      { name: "description", content: "Actualité et formations." },
    ],
  }),
  component: ExploreCategoryPage,
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

function ExploreCategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = Route.useParams();
  const [q, setQ] = useState("");

  if (!isExploreCategoryId(categoryId)) {
    return <Navigate to="/" />;
  }

  const cat = EXPLORE_CATEGORIES.find((c) => c.id === categoryId)!;
  const articles = useMemo(() => getArticlesByCategory(categoryId), [categoryId]);
  const formations = useMemo(() => getFormationsByCategory(categoryId), [categoryId]);

  const filteredFormations = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return formations;
    return formations.filter(
      (f) =>
        f.name.toLowerCase().includes(s) ||
        f.school.toLowerCase().includes(s) ||
        f.keywords.some((k) => k.includes(s)),
    );
  }, [formations, q]);

  return (
    <AppShell>
      <div className="px-5 pt-4 pb-6 animate-fade-in">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-2xl font-bold">{cat.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{cat.subtitle}</p>

        <Tabs defaultValue="actualite" className="mt-6">
          <TabsList className="w-full grid grid-cols-2 h-11 rounded-xl p-1">
            <TabsTrigger value="actualite" className="rounded-lg text-sm">
              Actualité
            </TabsTrigger>
            <TabsTrigger value="decouverte" className="rounded-lg text-sm">
              Découverte
            </TabsTrigger>
          </TabsList>

          <TabsContent value="actualite" className="mt-4 space-y-0">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  to="/explore/$categoryId/article/$articleId"
                  params={{ categoryId, articleId: a.id }}
                  className="snap-start shrink-0 w-[min(88vw,300px)] tap-feedback rounded-2xl bg-card border border-border p-4 shadow-card block"
                >
                  {a.schoolTag && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {a.schoolTag}
                    </span>
                  )}
                  <p className="mt-1 font-semibold text-sm leading-snug">{a.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{a.excerpt}</p>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    {formatArticleDate(a.publishedAt)}
                  </p>
                </Link>
              ))}
            </div>
            {articles.length === 0 && (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Aucun article pour l’instant.
              </p>
            )}
          </TabsContent>

          <TabsContent value="decouverte" className="mt-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher une formation…"
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm"
              />
            </div>
            <ul className="space-y-2">
              {filteredFormations.map((f) => (
                <li
                  key={f.id}
                  className="tap-feedback rounded-2xl bg-card border border-border shadow-card overflow-hidden flex items-stretch"
                >
                  <Link
                    to="/formation/$formationId"
                    params={{ formationId: f.id }}
                    className="flex-1 p-4 block text-left"
                  >
                    <p className="font-semibold text-sm">{f.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.school}</p>
                    <p className="text-[11px] text-primary font-medium mt-2">{f.level}</p>
                  </Link>
                  <div className="flex items-center pr-3 border-l border-border">
                    <FormationFavoriteButton formationId={f.id} />
                  </div>
                </li>
              ))}
            </ul>
            {filteredFormations.length === 0 && (
              <p className="text-sm text-muted-foreground py-6 text-center">
                Aucune formation ne correspond.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
