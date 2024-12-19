import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
      <p className="mt-4 text-lg">You do not have permission to access this page.</p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go Back to Home
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
