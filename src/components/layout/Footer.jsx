export default function Footer() {
  return (
    <footer className="border-t border-sand-200 bg-sand-50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
        BeachSpot · MVP acadêmico · {new Date().getFullYear()}
      </div>
    </footer>
  )
}
