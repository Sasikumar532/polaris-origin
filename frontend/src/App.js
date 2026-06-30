import "@/App.css";
import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import SiteLayout from "@/components/site/SiteLayout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App bg-white text-slate-900 antialiased">
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: 0,
            border: "1px solid #1f3a5f",
            background: "#ffffff",
            color: "#0b1220",
            fontFamily: "Inter, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
