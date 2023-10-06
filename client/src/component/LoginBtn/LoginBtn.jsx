import React from "react";
import { motion } from "framer-motion";
import "./LoginBtn.css";

function LoginBtn() {
  return (
    <motion.a
      className="btn botton login"
      href="/Login"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      Login
    </motion.a>
  );
}

export default LoginBtn;
