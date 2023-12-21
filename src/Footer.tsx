const Footer = () => {
  const now = new Date();

  return (
    <footer className="footer footer-center sticky top-[100vh] bg-base-300 p-4 text-base-content">
      <aside>
        <p>Copyright ©{now.getFullYear()} - All right reserved by SupTarr</p>
      </aside>
    </footer>
  );
};

export default Footer;
