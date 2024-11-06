import Logo from "../../../assets/logo.PNG";
import { Button } from "../button";

function Header() {
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src={Logo} alt="Company Logo" className="w-32 h-14"/>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Header;