import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "@uidotdev/usehooks";
import MainPage from "./Pages/MainPage/MainPage";
import CreatePage from "./Pages/CreatePage";
import DetailPage from "./Pages/DetailPage";
import EditPage from "./Pages/EditPage";
import { Note, NoteData, Tag } from "./types";
import { v4 as uuidv4 } from "uuid";
import Layout from "./componenets/Layout";


const App = () => {
  // Sayfa yenilendiğinde etiketleri kaybetmemek için useState ile kendi hook'umuzu yazıyoruz
  const [notes, setNotes] = useLocalStorage<Note[]>("notlar", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("taglar", []);

  // Yeni etiket oluştur
  const createTag = (tag: Tag): void => {
    setTags((prev) => [...prev, tag]);
  };

  // Yeni not oluştur
  const createNote = (noteData: NoteData): void => {
    // Objeye id özelliği ekle
    const newNote: Note = {
      id: uuidv4(),
      ...noteData,
    };

    // State'e yeni not ekle
    setNotes((prev) => [...prev, newNote]);
  };

  // Note sil
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Notu güncelle
  const updateNote = (id: string, updatedData: NoteData) => {
    // Güncellenecek notun statede tutuğumuz halini bulacağız onu. Akldırıp yerine güncel halini koyacağız
    const updated = notes.map((note) =>
      note.id === id
        ? {
            id,
            ...updatedData,
          }
        : note
    );

    // Stati güncelle
    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage notes={notes} availableTags={tags} />} />
        <Route
          path="/new"
          element={
            <CreatePage
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={notes} />}>
          <Route index element={<DetailPage deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditPage
                onSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
