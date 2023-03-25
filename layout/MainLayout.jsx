import { Header, Footer, BackToTop, Partner } from "./components";
import ScrollToTop from "react-scroll-to-top";
export function MainLayout({ children }) {
  return (
    <div>
      <Header />

      <main>{children}</main>
      <ScrollToTop
        smooth
        className='!rounded-[50%]'
        component={<BackToTop />}
      />
      <Partner />
      <Footer />
    </div>
  );
}
