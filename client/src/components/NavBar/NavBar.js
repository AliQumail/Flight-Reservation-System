import "./NavBar.css";

const NavBar = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light ">
      <a className="navbar-brand" href="/">
        <span className="fast">AVIAN </span>{" "}
        <span className="airlines">AIRLINES</span>
      </a>

      <div className="navbar-nav w-100 d-flex justify-content-end">
      <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link navs" href="/searchflights">Flights</a>
      </li>
      <li class="nav-item">
        <a class="nav-link navs" href="/ticket">Ticket</a>
      </li>
      <li class="nav-item">
        <a class="nav-link navs" href="/adminlogin">Admin</a>
      </li>
    </ul>
      </div>
     
    </nav>
      <hr/></div>
  );
};

export default NavBar;
