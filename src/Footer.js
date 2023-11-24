function Footer() {

  let year = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; PIOTR THEL {year}</p>
    </footer>
  );
}

export default Footer;
