import { Container } from "@/components/common/index";
import "react-toastify/dist/ReactToastify.css";
import {
  MdLocationOn,
  MdPhoneEnabled,
  MdSend,
  MdOutlineSupport,
} from "react-icons/md";

export function ContactSection() {
  const contact = [
    {
      icon: <MdLocationOn className="w-full h-full" />,
      content:
        "273 An Duong Vuong Street, Ward 3, District 5, Ho Chi Minh City, Vietnam",
      link: "https://goo.gl/maps/wNP95nCCu7E8H8M88",
    },
    {
      icon: <MdPhoneEnabled className="w-full h-full" />,
      content: "+84 937 192 146",
      link: "tel:+84937192146",
    },
    {
      icon: <MdSend className="w-full h-full" />,
      content: "huynhlequocbao2001@gmail.com",
      link: "mailto:huynhlequocbao2001@gmail.com",
    },
    {
      icon: <MdOutlineSupport className="w-full h-full" />,
      content: "https://shoe-store-fe.vercel.app/",
      link: "https://shoe-store-fe.vercel.app/",
    },
  ];

  return (
    <Container>
      <div className="mx-4 md:mx-0">
        <div className="text-3xl font-semibold mb-4">
          <h2>Contact Information</h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16">
          {contact.map((item, index) => (
            <div
              key={index}
              className="max-w-[300px] flex items-center text-base test-[#595959] font-light mb-2 md:mb-0 hover:text-primary"
            >
              <div className="h-5 w-5">{item.icon}</div>
              <a className="ml-2" href={item.link}>
                {item.content}
              </a>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-[#f5f5f5] p-4 md:p-8">
            <h3 className="text-3xl mb-4">Get In Touch</h3>
            <form>
              <div className="flex flex-col justify-evenly text-base text-secondary">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="flex flex-col mb-4 md:mb-0">
                    <label className="cursor-pointer" htmlFor="firstname">
                      First Name
                    </label>
                    <input
                      className="px-3 py-2 mt-2"
                      id="firstname"
                      type="text"
                      placeholder="Your firstname"
                    />
                  </div>
                  <div className="flex flex-col mb-4 md:mb-0">
                    <label className="cursor-pointer" htmlFor="lastname">
                      Last Name
                    </label>
                    <input
                      className="px-3 py-2 mt-2"
                      id="lastname"
                      type="text"
                      placeholder="Your lastname"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="cursor-pointer" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="px-3 py-2 mt-2"
                    id="email"
                    type="text"
                    placeholder="Your email address"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="cursor-pointer" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="px-3 py-2 mt-2"
                    id="subject"
                    type="text"
                    placeholder="Your subject of this message"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="cursor-pointer" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="px-3 py-2 mt-2 h-60"
                    id="message"
                    type="text"
                    placeholder="Say something about us"
                  />
                </div>
                <div className="my-4 text-center md:text-left">
                  <button
                    className="text-white bg-[#616161] rounded-[30px] hover:bg-primary px-3 py-2"
                    type="submit"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="h-96 xl:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669726937899!2d106.68006961458889!3d10.759917092332744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1679743780505!5m2!1svi!2s"
              width="100%"
              height="100%"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </Container>
  );
}
