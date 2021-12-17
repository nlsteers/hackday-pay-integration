import { Link } from "react-router-dom";
import { Button, Navbar, Alignment } from "@blueprintjs/core";

function Navigation() {
  return (
    <div>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Payments</Navbar.Heading>
          <Navbar.Divider />
          <Link to="/">
            <Button icon="home" minimal={true} large={true}>Home</Button>
          </Link>
          <Link to="/transactions">
            <Button icon="credit-card" minimal={true} large={true}>Transactions</Button>
          </Link>
        </Navbar.Group>
      </Navbar>
    </div>
  );
}

export default Navigation;
