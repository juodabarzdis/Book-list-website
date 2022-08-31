import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm text-center text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="#" className="hover:underline">
            My Book™
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
};

export default Footer;
