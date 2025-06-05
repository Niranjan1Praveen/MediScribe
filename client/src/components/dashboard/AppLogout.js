import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "../ui/button";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

function AppLogout(props) {
//   const { getUser } = getKindeServerSession();
//   const session = await getUser();
  return (
    <div>
      <LogoutLink>
        Logout
      </LogoutLink>
    </div>
  );
}

export default AppLogout;
