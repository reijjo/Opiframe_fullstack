import { useEffect, useState } from "react";
import LibraryItem from "../models/LibraryItem";

interface State {
  list: LibraryItem[];
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
            const list = temp as LibraryItem[];

            setState({
              list: list,
            });
            return;
          }
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
  // Get all books
  const getList = () => {
    setUrlRequest({
      request: new Request("/api/books", {
        method: "GET",
      }),
      action: "getList",
    });
  };

  // Edit book
  const edit = (item: LibraryItem) => {
    setUrlRequest({
      request: new Request(`/api/books/` + item.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }),
      action: "editItem",
    });
  };

  return { state, edit };
};

export default useAction;
