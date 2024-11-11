import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Book.svg";
import Searchform from "./searchform";
import Footer from "./footer";
import Book from "./book";
import LoadingCard from "./loadingCard";
import { useNavigate } from "react-router-dom"; 
const BookDetails = () => {
  const [details, setDetails] = useState([]);
  const [term, setTerm] = useState(" books");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const resources = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=11`
      );
      setDetails(resources.data.items);
      setIsLoading(false);
    };
    fetchDetails();
  }, [term]);

  const loadMore = async () => {
    const resources = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=8&startIndex=${details.length}`
    );
    setDetails((oldDetails) => [...oldDetails, ...resources.data.items]);
  };
  const handleBorrowClick = (bookName) => {
    // Store the book name and navigate to the BorrowPage
    navigate("/borrow", { state: { bookName } });
  };
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", padding: "2rem", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)" }}>
      <h2
        style={{
          textTransform: "capitalize",
          color: "#DB4437",
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "1rem",
          textShadow: "1px 1px 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        {term}
      </h2>
      <Searchform searchText={(text) => setTerm(text)} />
      
      {isLoading ? (
        <section style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : !details ? (
        <h1
          style={{
            background: "#1a1a1a",
            borderRadius: "10px",
            color: "#DB4437",
            padding: "1rem",
            textAlign: "center",
            fontSize: "2rem",
            marginTop: "2rem",
            textShadow: "1px 1px 5px rgba(255, 255, 255, 0.2)",
          }}
        >
          😞 Couldn't find books about {term}
        </h1>
      ) : (
        <section style={{ padding: "2rem 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
            {details.map((book, index) => (
              <Book {...book} key={index} />
            ))}
          </div>
          <div
            className="custom-card"
            style={{
              backgroundColor: "#1a1a1a",
              color: "white",
              borderRadius: "10px",
              padding: "1rem",
              textAlign: "center",
              marginTop: "2rem",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
            }}
          >
            <h3 style={{ fontSize: "1.32rem" }}>
              Didn't find the book you love?
            </h3>
            <img
              style={{ width: "100%", marginTop: "1rem", borderRadius: "5px" }}
              src={logo}
              alt="A man reading a book"
            />
            <h3 style={{ fontSize: "1.21rem", marginTop: "1rem" }}>
              Search for your favourite{" "}
              <span style={{ fontWeight: "bold", color: "#00ccff" }}>Genre</span> or{" "}
              <span style={{ fontWeight: "bold", color: "#00ccff" }}>Author</span> in the search box!
            </h3>
          </div>
          <div className="load-more" style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <button onClick={loadMore} style={{
              backgroundColor: "#DB4437",
              color: "white",
              border: "none",
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              transition: "background 0.3s",
            }}>Load More!</button>
          </div>
          <Footer />
        </section>
      )}
    </div>
  );
};

export default BookDetails;
