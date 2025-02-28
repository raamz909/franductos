import "./globals.css";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-[#fafafa] text-black dark:bg-[#0a0a0a] dark:text-white transition-colors duration-300">
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <NavBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
