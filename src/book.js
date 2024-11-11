import React from "react";
import { Link } from "react-router-dom";
import { BiLinkExternal } from "react-icons/bi";
import defaultBook from "./img/defaultBook.png";
import "../src/sass/style.css";
import { motion } from "framer-motion";

const Book = ({ id, volumeInfo }) => {
  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: "0px 0px 8px #000",
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.15,
      },
    },
  };

  let { title, authors, publisher, previewLink, imageLinks } = volumeInfo;

  // Default values
  title = title || "Title is not available";
  authors = authors || "Author(s) name not available";
  publisher = publisher || "Publisher company not available";
  previewLink = previewLink || "https://books.google.co.in/";

  return (
    <section key={id} className="loading-card">
      <div>
        <motion.img
          src={imageLinks ? imageLinks.thumbnail : defaultBook}
          width="100px"
          alt="Book-cover"
          variants={imageVariants}
          whileHover="hover"
        />
        <motion.div className="borrow-button-container">
          <Link
            to="/borrow"
            state={{ title, authors }}
            className="borrow-button"
          >
            Borrow
          </Link>
        </motion.div>
        <motion.div className="payment-button-container">
          <Link
            to="/payment" // You can create a route for the PaymentPage
            state={{ title, authors }}
            className="payment-button"
          >
            Pay Now
          </Link>
        </motion.div>
        <div>
          <h3 className="inline">{title}</h3>
        </div>

        <div>
          <h4 style={{ paddingBottom: "1rem", color: "black" }}>
            Author: <span style={{ fontWeight: "bold", color: "#3B3B3B" }}>{authors}</span>
          </h4>
        </div>

        <div>
          <h5 style={{ paddingBottom: "1rem", color: "black" }}>
            Published by: <span style={{ fontWeight: "bold", color: "#3B3B3B" }}>{publisher}</span>
          </h5>
        </div>

        <div>
          <h5 style={{ fontWeight: "bold", color: "black", paddingBottom: "1rem" }}>
            Read more :{" "}
            <a href={previewLink} target="_blank" rel="noreferrer">
              Google Books <BiLinkExternal />
            </a>
          </h5>
        </div>
      </div>
    </section>
  );
};

export default Book;
