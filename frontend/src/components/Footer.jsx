import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";

export default function FooterComp() {
  return (
    <Footer container className=" border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link className="self-center whitespace-nowrap text-xl  sm:text-xl font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Nitin&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                  100 JS Project
                </Footer.Link>
                <Footer.Link href="#" target="_blank">
                  Nitin&apos;s Blogs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                  Github
                </Footer.Link>
                <Footer.Link href="#">Linkedin</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#">Terms and Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="All CopyRight reserved by Nitin's Blog "
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0  mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsLinkedin} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsFacebook} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
