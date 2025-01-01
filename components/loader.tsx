import React from "react";

const Loader = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[200px] gap-2">
      <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      {message && (
        <p className="text-sm text-gray-600 text-center">{message}</p>
      )}
    </div>
  );
};

export default Loader;
