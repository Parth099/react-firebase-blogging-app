import Navbar from "../components/Navbar";
import { AuthProvider } from "../contexts/authContext";
import { StorageProvider } from "../contexts/storageContext";
/*
App will be the entry point of the app (haha)
This will be a place for <Outlet> and the Auth/Storage Providers
*/
function App() {
    return (
        <AuthProvider>
            <StorageProvider>
                <Navbar />
            </StorageProvider>
        </AuthProvider>
    );
}

export default App;
