import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import IntroCard from "@/components/introCard/IntroCard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <FloatButton
                    icon={<UpCircleOutlined />}
                    type="primary"
                    style={{ right: 40, width: "45px", height: "45px" }}
                    tooltip={<IntroCard />}
                  />
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
