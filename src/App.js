import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ListingPage from "./views/ListingPage/ListingPage";
import DetailsPage from "./views/Detail/DetailsPage";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "./features/search/searchSlice";
import PageNotFound from "./views/PageNotFound/PageNotFound";

function App() {
  // Redux dispatcher
  const dispatch = useDispatch();

  // Fetch countries data on component mount
  useEffect(() => {
    dispatch(getCountry());
  }, []);

  // Retrieve countries data from Redux store
  const check_Search = useSelector((state) => state.search.countries);

  return (
    <>
      {/* Define routes using BrowserRouter */}
      <BrowserRouter>
        <Routes>
          {/* Route for the listing page, passing countries data as props */}
          <Route path="/" element={<ListingPage data={check_Search} />} />
          
          {/* Route for the details page */}
          <Route path="/detail" element={<DetailsPage />} />
          
          {/* Route for handling undefined paths (404 page) */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
