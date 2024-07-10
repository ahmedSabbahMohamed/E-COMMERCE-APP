import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { Switch, Case, Default } from "react-if";
import { TbReload } from "react-icons/tb";

const Loading = ({ queryString }) => {
  const queryClient = useQueryClient();
  const [showDelayMessage, setShowDelayMessage] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayMessage(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = async () => {
    setIsReloading(true);
    await queryClient.invalidateQueries(queryString);
    setIsReloading(false);
  };

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center py-3">
      <div className="text-center">
        <Switch>
          <Case condition={showDelayMessage && !isReloading}>
            <div>
              <pre>Error while loading the page</pre>
              <TbReload
                size={"24"}
                style={{ cursor: "pointer" }}
                onClick={handleReload}
              />
            </div>
          </Case>
          <Default>
            <Spin />
          </Default>
        </Switch>
      </div>
    </div>
  );
};

export default Loading;
