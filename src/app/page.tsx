import { TranslatorForm } from "@/components/translator-form";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl md:text-7xl">
          LinguaLens
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-foreground/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Your AI-Powered Pocket Translator
        </p>
      </header>
      <main className="w-full max-w-2xl">
        <TranslatorForm />
      </main>
      <footer className="mt-12 text-center text-sm text-foreground/60">
        <p>&copy; {new Date().getFullYear()} LinguaLens. All rights reserved.</p>
      </footer>
    </div>
  );
}
