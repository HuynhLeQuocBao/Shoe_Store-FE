import { Header, Footer, BackToTop, Partner } from "./components";
import ScrollToTop from "react-scroll-to-top";
import FacebookMessenger from "utils/FacebookMessenger";
export function MainLayout({ children }) {
  return (
    <div>
      <Header />

      <main>{children}</main>
      <ScrollToTop
        smooth
        className="rounded-full z-50 fixed bottom-28"
        component={<BackToTop />}
      />
      <FacebookMessenger />
      <Partner />
      <Footer />
    </div>
  );
}
