import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import backgroundImage from "../../assests/images/authBack.jpg";

export const Wrapper = styled(Box)({
  ".full-height-wrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  ".container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    animation: "popIn 0.4s ease-out 0s forwards",
  },
  ".headingname": {
    paddingBottom: "50px",
  },
  "@keyframes popIn": {
    "0%": {
      opacity: "0",
      transform: "scale(0.5)",
    },
    "100%": {
      opacity: "1",
      transform: "scale(1)",
    },
  },

  ".login": {
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: "2px",
    display: "block",
    fontWeight: "bold",
    fontSize: "x-large",
  },
  ".card101": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "450px",
    width: "330px",
    flexDirection: "column",
    gap: "35px",
    background: "#e3e3e3",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // to remove the shadow
    backdropFilter: "blur(10px)", // to create the blur effect
    backgroundColor: "rgba(255, 255, 255, 0.1)", // to create the semi-transparent background
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },

  ".inputBox": {
    position: "relative",
    width: "250px",
  },

  ".inputBox input": {
    width: "100%",
    padding: "10px",
    outline: "none",
    border: "none",
    color: "#000",
    fontSize: "1em",
    background: "transparent",
    borderLeft: "2px solid #000",
    borderBottom: "2px solid #000",
    transition: "0.1s",
    borderBottomLeftRadius: "8px",
  },

  ".inputBox Span": {
    marginTop: "5px",
    position: "absolute",
    left: 0,
    transform: "translateY(-4px)",
    marginLeft: "10px",
    padding: "10px",
    pointerEvents: "none",
    fontSize: "12px",
    color: "#000",
    textTransform: "uppercase",
    transition: "0.5s",
    letterSpacing: "3px",
    borderRadius: "8px",
  },

  ".inputBox input:valid~span,.inputBox input:focus~span": {
    transform: "translateX(113px) translateY(-15px)",
    fontSize: "0.8em",
    padding: "5px 10px",
    background: "#000",
    letterSpacing: "0.2em",
    color: "#fff",
    border: "2px",
  },

  ".inputBox input:valid,.inputBox input:focus": {
    border: "2px solid #000",
    borderRadius: "8px",
  },

  ".enter": {
    height: "45px",
    width: "100px",
    borderRadius: "5px",
    border: "2px solid #000",
    cursor: "pointer",
    backgroundColor: "transparent",
    transition: "0.5s",
    textTransform: "uppercase",
    fontSize: "10px",
    letterSpacing: "2px",
    marginBottom: "1em",
  },
  ".enter:hover": {
    backgroundColor: "rgb(0, 0, 0)",
    color: "white",
  },
});