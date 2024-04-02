import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <ApolloProvider client={client}>
      <Toaster />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </div>
);
