import React from "react";
import Home from "./Home";
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Charts from "./Charts";

function App() {
    const queryClient = new QueryClient();

    return(
        <Provider store={store}>
         <QueryClientProvider client={queryClient}>
         <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/charts" element={<Charts/>}/>
            </Routes>
        </Router>
         </QueryClientProvider>
        </Provider>
    )
}

export default App;