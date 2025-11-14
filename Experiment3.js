import React, { useEffect, useState } from "react";

// Single-file React app component for Library Management UI
// Save this file as `LibraryApp.js` in your React app's `src/` folder.
// Requirements: React 18+, Node 18+, run a JSON Server at http://localhost:3001

const API_BASE = "http://localhost:3001/books";

export default function LibraryApp() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const emptyForm = { title: "", author: "", year: "", genre: "" };
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // UI state
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [filterGenre, setFilterGenre] = useState("all");

  // Fetch books
  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  // Create
  async function handleAdd(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      alert("Please provide at least a title and an author.");
      return;
    }
    const payload = { ...form };
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add book");
      const newBook = await res.json();
      setBooks((prev) => [...prev, newBook]);
      setForm(emptyForm);
    } catch (err) {
      alert("Add failed: " + err.message);
    }
  }

  // Prepare edit
  function startEdit(book) {
    setIsEditing(true);
    setEditId(book.id);
    setForm({ title: book.title, author: book.author, year: book.year, genre: book.genre });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update
  async function handleUpdate(e) {
    e.preventDefault();
    if (editId == null) return;
    try {
      const res = await fetch(`${API_BASE}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update book");
      const updated = await res.json();
      setBooks((prev) => prev.map((b) => (b.id === editId ? updated : b)));
      cancelEdit();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  }

  // Cancel edit
  function cancelEdit() {
    setIsEditing(false);
    setEditId(null);
    setForm(emptyForm);
  }

  // Delete
  async function handleDelete(id) {
    const ok = window.confirm("Delete this book? This action cannot be undone.");
    if (!ok) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  // Derived lists for search + filter + sort
  const genres = Array.from(new Set(books.map((b) => b.genre).filter(Boolean)));

  const displayed = books
    .filter((b) => {
      if (filterGenre !== "all" && filterGenre) return b.genre === filterGenre;
      return true;
    })
    .filter((b) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.genre && b.genre.toLowerCase().includes(q)) ||
        (b.year && String(b.year).includes(q))
      );
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      const x = (a[sortBy] || "").toString().toLowerCase();
      const y = (b[sortBy] || "").toString().toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });

  // Small presentational helpers
  const box = {
    padding: "12px",
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    background: "white",
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>📚 Library Management</h1>
        <div style={{ fontSize: 13, color: "#555" }}>React + JSON Server • Full CRUD</div>
      </header>

      {/* Form */}
      <div style={{ marginBottom: 18, ...box }}>
        <h2 style={{ marginTop: 0 }}>{isEditing ? "Edit Book" : "Add New Book"}</h2>
        <form onSubmit={isEditing ? handleUpdate : handleAdd} style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}>
          <input
            placeholder="Title *"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            style={{ padding: 8, fontSize: 14 }}
          />

          <input
            placeholder="Author *"
            value={form.author}
            onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
            required
            style={{ padding: 8, fontSize: 14 }}
          />

          <input
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
            style={{ padding: 8, fontSize: 14 }}
          />

          <input
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm((f) => ({ ...f, genre: e.target.value }))}
            style={{ padding: 8, fontSize: 14 }}
          />

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8, marginTop: 6 }}>
            <button type="submit" style={{ padding: "8px 12px", borderRadius: 6, border: "none", cursor: "pointer" }}>
              {isEditing ? "Save Changes" : "Add Book"}
            </button>
            {isEditing && (
              <button type="button" onClick={cancelEdit} style={{ padding: "8px 12px", borderRadius: 6 }}>
                Cancel
              </button>
            )}
            <div style={{ marginLeft: "auto", alignSelf: "center", color: "#666", fontSize: 13 }}>
              Tip: Click "Edit" on a book to load it here.
            </div>
          </div>
        </form>
      </div>

      {/* Filters / Search */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <input
          placeholder="Search by title, author, genre or year..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, flex: 1 }}
        />

        <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)} style={{ padding: 8 }}>
          <option value="all">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: 8 }}>
          <option value="title">Sort: Title</option>
          <option value="author">Sort: Author</option>
          <option value="year">Sort: Year</option>
        </select>

        <button onClick={fetchBooks} style={{ padding: "8px 12px" }}>
          Refresh
        </button>
      </div>

      {/* List */}
      <div style={{ display: "grid", gap: 12 }}>
        {loading && <div style={box}>Loading books...</div>}
        {error && <div style={{ ...box, borderLeft: "4px solid #f55" }}>Error: {error}</div>}

        {!loading && displayed.length === 0 && (
          <div style={box}>No books found. Add your first book above.</div>
        )}

        {displayed.map((book) => (
          <div key={book.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...box }}>
            <div>
              <div style={{ fontWeight: 600 }}>{book.title}</div>
              <div style={{ fontSize: 13, color: "#444" }}>{book.author} • {book.year || "Year N/A"} • {book.genre || "Genre N/A"}</div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => startEdit(book)} style={{ padding: "6px 10px", borderRadius: 6 }}>
                Edit
              </button>
              <button onClick={() => handleDelete(book.id)} style={{ padding: "6px 10px", borderRadius: 6 }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: 22, textAlign: "center", color: "#666", fontSize: 13 }}>
        <div>JSON Server endpoint: <code>{API_BASE}</code></div>
        <div style={{ marginTop: 6 }}>Example db.json:
          <pre style={{ textAlign: "left", display: "inline-block", margin: 0, padding: 6, borderRadius: 6, background: "#f6f6f6" }}>
{`{
  "books": [
    { "id": 1, "title": "Clean Code", "author": "Robert C. Martin", "year": 2008, "genre": "Programming" }
  ]
}`}
          </pre>
        </div>
      </footer>
    </div>
  );
}
