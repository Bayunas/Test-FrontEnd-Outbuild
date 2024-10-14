const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: localStorage.getItem("token") || null,
      users: [],
    },
    actions: {
      login: ({ email, password }) => {
        const validUser =
          email === "prologin@prologin.com" && password === "ProLogin123456"; // is better with jwt on a real apllication this method is just used because its only a front end application

        if (validUser) {
          const token = "698134asdgas67"; // Hard coded token but if we use the JWT as mentioned before it would be harder to have a security breach.
          setStore({ token });
          localStorage.setItem("token", token);
          return { token };
        } else {
          console.log("Invalid credentials");
          return false;
        }
      },
      getData: async () => {
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/comments",
            {
              method: "GET",
              headers: {},
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStore({ users: data });
            return data;
          } else {
            throw new Error("Failed to fetch Data");
          }
        } catch (error) {
          console.log(error);
          return { error: "unexpected error" };
        }
      },
      logout: () => {
        setStore({
          token: null,
        });
        localStorage.removeItem("token");
        return true;
      },
    },
  };
};

export default getState;
