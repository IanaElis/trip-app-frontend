import { AuthContextProvider } from "./contexts/AuthContext";
import Router from "./routes/Router";
import { Suspense } from "react";
import PageLoader from "./components/PagePoader";

function App() {
    return (
        <AuthContextProvider>
            <Suspense fallback={<PageLoader />}>
                <Router />
            </Suspense>
        </AuthContextProvider>
    );
}

export default App;