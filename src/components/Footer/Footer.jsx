import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed by Christian Hopper</p>
      <p className="footer__text">© {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
