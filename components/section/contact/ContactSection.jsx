/* eslint-disable @next/next/no-img-element */
import { Container } from '@/components/common/index';
import { useForm } from 'react-hook-form';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdLocationOn, MdPhoneEnabled, MdSend, MdOutlineSupport } from "react-icons/md";

export function ContactSection() {
  const contact = [
    {
      icon: <MdLocationOn className="w-full h-full" />,
      content: <>198 West 21th Street, <br /> Suite 721 New York NY 10016</>,
    },
    {
      icon: <MdPhoneEnabled className="w-full h-full" />,
      content: "+ 1235 2355 98",
    },
    {
      icon: <MdSend className="w-full h-full" />,
      content: "info@yoursite.com",
    },
    {
      icon: <MdOutlineSupport className="w-full h-full" />,
      content: "yoursite.com",
    }
  ];


  return (
    <Container>
      <div className="mx-4 md:mx-0">
        <div className="text-3xl font-semibold mb-4">
          <h2>Contact Information</h2>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16">
          {contact.map((item, index) => (
            <div key={index} className="flex items-center text-base test-[#595959] font-light mb-2 md:mb-0">
              <div className="h-5 w-5">{item.icon}</div>
              <a className="ml-2">{item.content}</a>
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
                    <label className="cursor-pointer" htmlFor="firstname" >First Name</label>
                    <input className="px-3 py-2 mt-2" id='firstname' type="text" placeholder='Your firstname' />
                  </div>
                  <div className="flex flex-col mb-4 md:mb-0">
                    <label className="cursor-pointer" htmlFor="lastname">Last Name</label>
                    <input className="px-3 py-2 mt-2" id='lastname' type="text" placeholder='Your lastname' />
                  </div>
                </div>
                <div className="flex flex-col mb-4">
                  <label className="cursor-pointer" htmlFor="email" >Email</label>
                  <input className="px-3 py-2 mt-2" id='email' type="text" placeholder='Your email address' />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="cursor-pointer" htmlFor="subject" >Subject</label>
                  <input className="px-3 py-2 mt-2" id='subject' type="text" placeholder='Your subject of this message' />
                </div>
                <div className="flex flex-col mb-4">
                  <label className="cursor-pointer" htmlFor="message" >Message</label>
                  <textarea className="px-3 py-2 mt-2 h-60" id='message' type="text" placeholder='Say something about us' />
                </div>
                <div className="my-4 text-center md:text-left">
                  <button className="text-white bg-[#616161] rounded-[30px] hover:bg-primary px-3 py-2" type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
          <div className="h-96 xl:h-full">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8795348076715!2d-73.99865654909114!3d40.742676179227054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bb665a5b95%3A0x37d23ed9e6c9479e!2s198%20W%2021st%20St%20%23721%2C%20New%20York%2C%20NY%2010011%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1663840797386!5m2!1svi!2s" width="100%" height="100%"></iframe>
          </div>
        </div>
      </div>
    </Container>
  );
}
