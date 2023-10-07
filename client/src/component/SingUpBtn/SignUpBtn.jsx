import React from "react";
import { motion } from "framer-motion";
import "./SignUpBtn.css";

function SignUpBtn({ variant }) {
  // Conditionally apply the appropriate class based on the variant prop
  const buttonClassName =
    variant === "primary"
      ? "btn botton sign-up primary"
      : "btn botton sign-up secondary";

  return (
    <motion.a
      className={buttonClassName}
      href="/register"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      Join for free
    </motion.a>
  );
}

export default SignUpBtn;
