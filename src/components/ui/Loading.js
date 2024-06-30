import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const Loading = ({ queryString }) => {
  const queryClient = useQueryClient();
  const [showDelayMessage, setShowDelayMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayMessage(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    queryClient.invalidateQueries(queryString);
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <Spin />
        {showDelayMessage && (
          <div>
            <pre>This page is taking a while to load...</pre>
            <button className="btn btn-primary fw-bold" onClick={handleReload}>
              Reload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
