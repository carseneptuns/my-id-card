import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import CreateCard from "./pages/CreateCard.jsx";
import MyCards from "./pages/MyCards.jsx";
import EditCard from "./pages/EditCard.jsx";
import { ToastProvider } from "./components/Toast.jsx";

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-forest text-inkblack">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCard />} />
          <Route path="/my-cards" element={<MyCards />} />
          <Route path="/edit/:id" element={<EditCard />} />
        </Routes>
      </div>
    </ToastProvider>
  );
}
