import { Link, NavLink } from "@remix-run/react";

// enum for the different routes
export enum Routes {
  Dashboard,
  Settings,
  Profile,
  Creator,
  Index,
}

export const SideNav: React.FC<{ selected: Routes }> = ({ selected }) => {
  return (
    <div className="h-screen w-[300px] bg-bg-primary py-3 px-10 flex flex-col justify-between">
      <div>
        <NavLink to={"/"}>
          <img src="/iv_large.png" alt="insiderviz logo" />
        </NavLink>
        <ul className="py-5">
          <MainNavLink
            name="dashboard"
            route="/dashboard/aapl"
            selected={selected === Routes.Dashboard}
          />
          <MainNavLink
            name="settings"
            route="/settings"
            selected={selected === Routes.Settings}
          />
          <MainNavLink
            name="profile"
            route="/profile"
            selected={selected === Routes.Profile}
          />
          <MainNavLink
            name="creator"
            route="/creator"
            selected={selected === Routes.Creator}
          />
        </ul>
      </div>
      <div className="flex flex-col">
        <h4 className="text-center font-light text-gray-300">
          <a href="https://twitter.com/benjamin41902">@benjamin41902</a>
        </h4>
        <h4 className="text-center font-light text-gray-300">
          <a href="https://insiderviz.com">real site</a>
        </h4>
      </div>
    </div>
  );
};

const MainNavLink: React.FC<{
  selected: boolean;
  name: string;
  route: string;
}> = ({ selected, route, name }) => {
  return (
    <li
      className={`mb-5 text-white text-2xl font-bold text-center hover:bg-bg-secondary rounded-md hover:cursor-pointer py-2
    ${selected && "underline"}`}
    >
      <NavLink to={route} className={``}>
        {name}
      </NavLink>
    </li>
  );
};
