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
          case "getLoaned": {
            const temp = await response.json();
            const list = temp as LibraryItem[];
            const loaned = list.filter((item) => item.loaned);

            setState({
              list: loaned,
            });
            return;
          }
          case "getAvailable": {
            const temp = await response.json();
            const list = temp as LibraryItem[];
            const available = list.filter((item) => !item.loaned);

            setState({
              list: available,
            });
            return;
          }
          case "editItem": {
            getList();
            return;
          }
          case "addBook": {
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

  // Get loaned books
  const getLoaned = () => {
    setUrlRequest({
      request: new Request("/api/books", {
        method: "GET",
      }),
      action: "getLoaned",
    });
  };

  // Get available books
  const getAvailable = () => {
    setUrlRequest({
      request: new Request("/api/books", {
        method: "GET",
      }),
      action: "getAvailable",
    });
  };

  // Add book
  const add = (item: LibraryItem) => {
    setUrlRequest({
      request: new Request("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }),
      action: "addBook",
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

  return { state, edit, getLoaned, getList, getAvailable, add };
};

export default useAction;
