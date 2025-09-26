export default function Layout({ children }) {
  return (
    // Flex för att hålla footer längst ner
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* HEADER – alltid synlig */}
      <header className="relative z-50 bg-indigo-600 text-white shadow-md">
        <div className="flex max-w-7xl items-center justify-start px-4 py-4">
          {/* Titel alltid till vänster */}
          <h1 className="text-xl font-bold tracking-wide">Excel Editor</h1>
        </div>
      </header>

      {/* SIDANS INNEHÅLL – här renderas UploadFile/EditableTable/ExportDialogue */}
      <main className="relative z-10 flex-grow">{children}</main>

      {/* FOOTER – alltid synlig */}
      <footer className="relative z-50 bg-indigo-700 text-indigo-100 mt-6">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm">
          © {new Date().getFullYear()} Excel Editor — Skapad av State Of Mind
        </div>
      </footer>
    </div>
  );
}
