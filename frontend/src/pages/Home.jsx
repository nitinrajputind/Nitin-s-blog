export default function Home() {
  return (
    <div>
      Home
      <BlogCard />
      <BlogCard2 />
      <BlogCard3 />
    </div>
  );
}

const BlogCard3 = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex transition-transform transform hover:scale-105">
      <div className="w-1/3 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform transform hover:scale-110"
          src="https://via.placeholder.com/300"
          alt="Blog"
        />
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        <div className="mb-4">
          <p className="text-xs text-gray-500">4d ago</p>
          <p className="text-sm font-medium text-gray-700">The Startup</p>
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-gray-800">The Plight of False Urgency</h2>
          <p className="text-gray-600">Putting a rush order on non-priorities is slowly killing your team</p>
        </div>
      </div>
    </div>
  );
};


export const BlogCard = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center p-4">
        <img
          className="w-12 h-12 rounded-full"
          src="https://via.placeholder.com/50"
          alt="Author"
        />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-700">Avi Siegel</p>
          <p className="text-xs text-gray-500">in The Startup</p>
        </div>
      </div>
      <img
        className="w-full h-48 object-cover"
        src="https://via.placeholder.com/600x400"
        alt="Blog"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          The Plight of False Urgency
        </h2>
        <p className="text-gray-600">
          Putting a rush order on non-priorities is slowly killing your team
        </p>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>4d ago</span>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>347</span>
            <svg
              className="w-5 h-5 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v8a2 2 0 002 2h2m10-12V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v3m4 4v4"
              ></path>
            </svg>
            <span className="ml-1">5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogCard2 = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex">
      <div className="w-1/3">
        <img
          className="w-full h-full object-cover"
          src="https://via.placeholder.com/300"
          alt="Blog"
        />
      </div>
      <div className="w-2/3 p-4 flex flex-col">
        <div className="flex items-center mb-4">
          <img
            className="w-12 h-12 rounded-full"
            src="https://via.placeholder.com/50"
            alt="Author"
          />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-700">Avi Siegel</p>
            <p className="text-xs text-gray-500">in The Startup</p>
          </div>
        </div>
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-gray-800">The Plight of False Urgency</h2>
          <p className="text-gray-600">Putting a rush order on non-priorities is slowly killing your team</p>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4 flex items-center justify-between text-sm text-gray-500">
          <span>4d ago</span>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>347</span>
            <svg
              className="w-5 h-5 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v8a2 2 0 002 2h2m10-12V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v3m4 4v4"
              ></path>
            </svg>
            <span className="ml-1">5</span>
          </div>
        </div>
      </div>
    </div>
  );
};
