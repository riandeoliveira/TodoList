interface MainProps {
  children: JSX.Element | JSX.Element[];
}

const Main = ({ children }: MainProps): JSX.Element => {
  return <main>{children}</main>;
};

export default Main;
