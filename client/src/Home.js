import { useEffect, useState, useRef } from "react";
import Axios from "axios";
import "./Home.css";
import Book from "./Components/Book";
import Modal from "./Components/Modal";

function Home(props) {
  const { loggedIn } = props;
  const modalRef = useRef();
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    author: "",
    image: "",
    description: "",
    price: "",
  });

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (showModal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [showModal]);

  useEffect(() => {
    Axios.get("http://localhost:3000/api/books/")
      .then((res) => {
        setBooks(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          data={modalData}
        />
        <div className="Home">
          <div className="book-list">
            {books.map((book, index) => {
              return (
                index < 5 && (
                  <div
                    onClick={() => {
                      setModalData({
                        title: book.title,
                        author: book.author,
                        image: book.image,
                        description: book.description,
                        price: book.price,
                      });
                      openModal();
                    }}
                  >
                    <Book
                      id={book.id}
                      title={book.title}
                      author={book.author}
                      description={book.description}
                      price={book.price}
                      img={book.image}
                    />
                  </div>
                )
              );
            })}
          </div>

          <div className="overflow-x-auto relative my-14">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Cover
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Book title
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Author
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  return (
                    <tr
                      onClick={(e) => {
                        openModal();
                        setModalData({
                          title: book.title,
                          author: book.author,
                          image: book.image,
                          description: book.description,
                          price: book.price,
                        });
                      }}
                      className="table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th className="py-4 px-6 w-24">
                        <img src={book.image} alt="" />
                      </th>
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {book.title}
                      </th>
                      <td className="py-4 px-6">{book.author}</td>
                      <td className="py-4 px-6">{book.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
