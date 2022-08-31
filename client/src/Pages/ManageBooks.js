import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../Home.css";
// import EditModal from "./Edit";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [alert, setAlert] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [modalData, setModalData] = useState({
  //   title: "",
  //   author: "",
  //   image: "",
  //   description: "",
  //   price: "",
  // });

  // const openModal = () => {
  //   setShowModal((prev) => !prev);
  // };

  // useEffect(() => {
  //   if (showModal === true) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "scroll";
  //   }
  // }, [showModal]);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3000/api/books/")
      .then((res) => {
        setBooks(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleDelete = (id) => {
    // if (isNaN(id) || !loggedIn) return;

    Axios.delete("/api/books/delete/" + id)
      .then((res) => {
        console.log(res.data);
        setAlert(res.data);
        setRefresh(!refresh);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
        setAlert(err.message);
        window.scrollTo(0, 0);

        if (err.response.status === 401) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .finally(() => {
        setTimeout(() => setAlert(""), 2000);
      });
  };

  return (
    <>
      <div className="overflow-x-auto relative my-14">
        {alert && <div className="alert">{alert}</div>}
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
              <th scope="col" className="py-3 px-6">
                Edit
              </th>
              <th scope="col" className="py-3 px-6">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr
                  // onClick={(e) => {
                  //   openModal();
                  //   setModalData({
                  //     title: book.title,
                  //     author: book.author,
                  //     image: book.image,
                  //     description: book.description,
                  //     price: book.price,
                  //   });
                  // }}
                  key={book.id}
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
                  <td className="py-4 px-6">
                    <Link className="edit-btn" to={"/edit/" + book.id}>
                      Edit
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <Link
                      className="delete-btn"
                      to=""
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageBooks;
