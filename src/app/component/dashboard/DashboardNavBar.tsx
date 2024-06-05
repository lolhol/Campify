import cx from "classnames";
interface DashboardNavBarProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardNavBar(props: DashboardNavBarProps) {
  return (
    <div className={cx("flex justify-between w-full h-full", props.className)}>
      {props.children}
    </div>
  );
}

export function NavBarImageText(props: {
  children: [React.ReactNode, React.ReactNode];
  className?: string;
}) {
  return (
    <div className={cx("flex w-56", props.className)}>
      <div className="w-1/3">{props.children[0]}</div>
      <div className="text-black w-2/3 text-2xl font-sans flex justify-center items-center">
        {props.children[1]}
      </div>
    </div>
  );
}

export function NavBarButton(
  props: DashboardNavBarProps & {
    onClick: () => void;
  }
) {
  return (
    <button
      className={cx("w-fit h-full", props.className)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
