import { cn } from "@/src/shared/lib/cn";
import type { FeatureItem } from "@/src/shared/types/content";
import type { FeaturePreviewContent } from "./content";

export function FeaturePreview({ type, content }: { type: FeatureItem["preview"]; content: FeaturePreviewContent }) {
  if (type === "grid") return <div className="preview-grid">{Array.from({ length: 12 }).map((_, i) => <span key={i} className={cn(i === 2 || i === 7 ? "is-hot" : i === 5 || i === 10 ? "is-mid" : "")} />)}</div>;
  if (type === "ring") return <div className="preview-ring"><span>82<small>%</small></span><i /></div>;
  if (type === "team") return <div className="preview-team">{["AK", "DS", "RM", "+8"].map((item, i) => <span key={item} style={{ zIndex: 4 - i }}>{item}</span>)}<small>{content.shift}</small></div>;
  if (type === "cash") return <div className="preview-cash"><strong>{content.billion}</strong><span><i style={{ width: "72%" }} /><i style={{ width: "52%" }} /><i style={{ width: "88%" }} /></span></div>;
  if (type === "pipeline") return <div className="preview-pipeline">{content.pipeline.map((item, i) => <span key={item}><i className={i < 3 ? "done" : ""} />{item}</span>)}</div>;
  if (type === "line") return <div className="preview-line"><span className="line-track" /><i className="line-dot dot-a" /><i className="line-dot dot-b" /><i className="line-dot dot-c" /><small>{content.plan}</small></div>;
  if (type === "report") return <div className="preview-report"><div className="report-bars">{[38, 64, 50, 82, 72, 94, 86].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div><span><small>OEE</small><strong>87.4%</strong></span></div>;
  return <div className="preview-bars">{content.suppliers.map((label, i) => <span key={label}><small>{label}</small><i style={{ width: `${84 - i * 17}%` }} /></span>)}</div>;
}
