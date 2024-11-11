import { useNavigation } from "@/hooks/useNavigation";

const NotFound = () => {
  const { goToPage } = useNavigation();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => goToPage("/")}
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
