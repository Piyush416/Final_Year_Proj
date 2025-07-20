import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "../../hooks/usebreadCrumbs";
import { ArrowBigRight, Slash,Dot, ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumb className="flex items-center space-x-2 py-2 px-4">
      <BreadcrumbItem >
        <BreadcrumbLink href="/" className="font-medium hover:scale-110">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {/* <BreadcrumbSeparator /> */}
          <ChevronRight />
          
          <BreadcrumbItem>
            <BreadcrumbLink href={crumb.path} className="capitalize hover:scale-110">
              {crumb.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
