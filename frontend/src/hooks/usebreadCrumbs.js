import { useLocation } from "react-router-dom";

export const useBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = pathnames.map((segment, index) => {
    const name = segment
      .replace(/-/g, " ")                       // Replace dashes with spaces
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize first letter of each word

    const path = "/" + pathnames.slice(0, index + 1).join("/");

    return { name, path };
  });

  return breadcrumbs;
};
