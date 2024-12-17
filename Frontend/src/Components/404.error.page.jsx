import {Link} from "react-router-dom";

const NotFound = () =>  {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <svg
            className="mx-auto h-40 w-auto text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="mt-4 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            404 - Page Not Found
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
export default NotFound

