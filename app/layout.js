import AuthProvider from "../middleware/AuthProvider";
import Nav from "../components/(components)/Nav";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Flatzy",
  description: "Discover rental flats, hostels, and rooms with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-gray-100">
          {/* <Nav /> */}
          <div>{children}</div>
          <Toaster position="top-right" reverseOrder={false} />
        </body>
      </AuthProvider>
    </html>
  );
}
