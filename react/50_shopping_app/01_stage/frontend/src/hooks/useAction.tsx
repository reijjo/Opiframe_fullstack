import { useEffect, useState } from "react";
import ShoppingItem from "../models/ShoppingItem";

interface State {
  list: ShoppingItem[];
}

interface UrlRequest {
  request: Request;
  action: string;
}

const useAction = () => {
  const [state, setState] = useState<State>({
    list: [],
  });

  const [urlRequest, setUrlRequest] = useState<UrlRequest>({
    request: new Request("", {}),
    action: "",
  });

  useEffect(() => {
    getList();
  }, []);

  // Fetch stuff from backend
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(urlRequest.request);

      if (!response) {
        console.log("Server did not respond!!");
        return;
      }

      if (response.ok) {
        switch (urlRequest.action) {
          case "getList": {
            const temp = await response.json();
            const list = temp as ShoppingItem[];

            setState({
              list: list,
            });
            return;
          }
          case "addItem":
          case "removeItem":
          case "editItem": {
            getList();
            return;
          }
          default:
            return;
        }
      } else {
        console.log(
          `Server responded with a status ${response.status} ${response.statusText}`
        );
      }
    };

    fetchData();
  }, [urlRequest]);

  // Helper functions
  const getList = () => {
    setUrlRequest({
      request: new Request("/api/shopping", {
        method: "GET",
      }),
      action: "getList",
    });
  };

  const add = (item: ShoppingItem) => {
    setUrlRequest({
      request: new Request("/api/shopping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }),
      action: "addItem",
    });
  };

  const remove = (id: number) => {
    setUrlRequest({
      request: new Request("/api/shopping/" + id, {
        method: "DELETE",
      }),
      action: "removeItem",
    });
  };

  const edit = (item: ShoppingItem) => {
    setUrlRequest({
      request: new Request("/api/shopping/" + item.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }),
      action: "editItem",
    });
  };

  return { state, add, remove, edit };
};

export default useAction;
