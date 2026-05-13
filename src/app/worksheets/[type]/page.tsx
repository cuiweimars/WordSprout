import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TracingWorksheetPage } from "@/components/pdf/tracing-worksheet-page";
import { FillBlankWorksheetPage } from "@/components/pdf/fill-blank-worksheet-page";

const validTypes = ["tracing", "fill-blank"] as const;

export function generateStaticParams() {
  return validTypes.map((type) => ({ type }));
}

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const titles: Record<string, string> = {
    tracing: "Sight Word Tracing Worksheets — Free Printable",
    "fill-blank": "Fill-in-the-Blank Sight Word Worksheets — Free Printable",
  };
  return {
    title: titles[type] || "Sight Word Worksheets",
    description: `Free printable ${titles[type]?.toLowerCase() || "worksheets"} for sight word practice. Dolch and Fry word lists for Pre-K through 3rd Grade.`,
  };
}

export default async function WorksheetTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!validTypes.includes(type as (typeof validTypes)[number])) notFound();

  const titles: Record<string, string> = {
    tracing: "Tracing Worksheets",
    "fill-blank": "Fill-in-the-Blank Worksheets",
  };
  const descriptions: Record<string, string> = {
    tracing: "Practice writing sight words with guided tracing lines.",
    "fill-blank": "Complete sentences by filling in the missing sight word.",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-sprout-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/worksheets" className="hover:text-sprout-600">Worksheets</Link></li>
          <li>/</li>
          <li className="text-gray-800 font-medium">{titles[type]}</li>
        </ol>
      </nav>

      <h1 className="font-heading text-4xl font-bold text-gray-800 mb-4">
        {titles[type]}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {descriptions[type]}
      </p>

      {type === "tracing" && <TracingWorksheetPage />}
      {type === "fill-blank" && <FillBlankWorksheetPage />}
    </div>
  );
}
