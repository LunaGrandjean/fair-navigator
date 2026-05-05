import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ArrowLeft } from "lucide-react";
import { getArticleById, isExploreCategoryId } from "@/lib/explore-data";

export const Route = createFileRoute("/explore/$categoryId/article/$articleId")({
  head: ({ params }) => ({
    meta: [{ title: `Article — ${params.articleId}` }],
  }),
  component: ArticleReader,
});

function formatArticleDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function ArticleReader() {
  const navigate = useNavigate();
  const { categoryId, articleId } = Route.useParams();
  const article = getArticleById(articleId);

  if (!isExploreCategoryId(categoryId) || !article || article.categoryId !== categoryId) {
    return <Navigate to="/" />;
  }

  return (
    <AppShell showNav={false}>
      <article className="px-5 pt-4 pb-8 animate-fade-in min-h-full flex flex-col">
        <button
          type="button"
          onClick={() => navigate({ to: "/explore/$categoryId", params: { categoryId } })}
          className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        {article.schoolTag && (
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            {article.schoolTag}
          </p>
        )}
        <h1 className="text-xl font-bold leading-tight mt-1">{article.title}</h1>
        <p className="text-xs text-muted-foreground mt-2">
          {formatArticleDate(article.publishedAt)}
        </p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground whitespace-pre-line flex-1">
          {article.body}
        </div>
      </article>
    </AppShell>
  );
}
