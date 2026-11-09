import { Calendar } from "lucide-react";
import type { ReactNode } from "react";

type LatestAlertProps = {
  className: string;
  date: string;
  dateTime: string;
  title: string;
  body: string;
  children?: ReactNode;
};

export default function LatestAlert({
  className,
  date,
  dateTime,
  title,
  body,
  children,
}: LatestAlertProps) {
  return (
    <section className={`grid justify-items-end gap-1 text-right ${className}`}>
      <time
        className="text-serif inline-flex items-center gap-1.5 text-ui leading-tight text-muted-foreground"
        dateTime={dateTime}
      >
        <Calendar className="size-4 shrink-0" aria-hidden="true" />
        {date}
      </time>
      <h2 className="m-0 text-heading-6 leading-tight font-normal text-primary">{title}</h2>
      <p className="text-serif m-0 max-w-[40ch] text-ui leading-tight text-pretty text-secondary-900">
        {body}
      </p>
      {children}
    </section>
  );
}
