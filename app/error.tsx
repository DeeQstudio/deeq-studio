"use client";
import { useEffect } from "react";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return <section className="errorPage"><p>Something interrupted the queue.</p><h1>Try that again.</h1><button type="button" onClick={reset}>Reload this page</button></section>;
}
