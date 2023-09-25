import { NoteBoardColorProvider } from "./features/StickyNotes/NoteBoard";
import Header from "./components/Layout/Header";
import NoteBoard from "./features/StickyNotes";
import Footer from "./components/Layout/Footer/Footer";
import "./styles.css";

export default function App() {
  return (
    <NoteBoardColorProvider>
      <Header />
      <NoteBoard />
      <Footer />
    </NoteBoardColorProvider>
  );
}
