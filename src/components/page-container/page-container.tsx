import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children?: ReactNode;
  pageName: string;
  pageLink: string;
  destinationPage: string;
};

export const PageContainer = ({ destinationPage, pageName, pageLink, children }: Props) => {
  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <h1>{pageName}</h1>
        <Link to={pageLink}>{destinationPage}</Link>
      </div>
      {children}
    </div>
  );
};
