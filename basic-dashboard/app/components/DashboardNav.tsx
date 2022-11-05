import { Link } from "@remix-run/react";

export enum DashboardRoutes {
  AAPL,
  AMZN,
  META,
  TSLA,
}

export const DashboardNav: React.FC<{ selected: DashboardRoutes }> = ({
  selected,
}) => {
  return (
    <nav className="flex justify-center w-full flex-col">
      <div className="w-full flex justify-center mb-2">
        <ul className="flex flex-row space-x-10">
          <DashboardNavLink
            name="AAPL"
            route="/dashboard/aapl"
            selected={selected === DashboardRoutes.AAPL}
          />
          <DashboardNavLink
            name="AMZN"
            route="/dashboard/amzn"
            selected={selected === DashboardRoutes.AMZN}
          />
          <DashboardNavLink
            name="META"
            route="/dashboard/meta"
            selected={selected === DashboardRoutes.META}
          />
          <DashboardNavLink
            name="TSLA"
            route="/dashboard/tsla"
            selected={selected === DashboardRoutes.TSLA}
          />
        </ul>
      </div>
      <hr className="h-2 text-gray-400" />
    </nav>
  );
};

const DashboardNavLink: React.FC<{
  name: string;
  route: string;
  selected: boolean;
}> = ({ name, route, selected }) => {
  return (
    <li className="text-2xl font-light text-white hover:bg-bg-primary px-2 py-2 rounded-md">
      <Link to={route} className={selected ? "underline" : ""}>
        {name}
      </Link>
    </li>
  );
};
