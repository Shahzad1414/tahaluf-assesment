import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ListingPage from "./views/ListingPage/ListingPage";
import DetailsPage from "./views/DetailsPage";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "./features/search/searchSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountry());
  }, []);

  const check_Search = useSelector((state) => state.search.countries);
  console.log(check_Search);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListingPage data={check_Search} />} />
          <Route path="/detail/:country" element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
