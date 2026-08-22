"use client";
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><main className="errorPage"><p>DeeQ Studio could not load.</p><h1>Something went wrong.</h1><button type="button" onClick={reset}>Try again</button></main></body></html>;
}
