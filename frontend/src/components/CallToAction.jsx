import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center ">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">want to Learn more about JavaScript ?</h2>
        <p className="text-gray-500 my-2">
          Check out these resources to learn more about JavaScript
        </p>
        <Button
          gradientDuoTone={"purpleToPink"}
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://github.com/nitinrajputind"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg?tx=w_1920,q_auto"
          alt=""
        />
      </div>
    </div>
  );
}
