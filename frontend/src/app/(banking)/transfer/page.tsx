import Header from "@/components/header";
import Transfer from "@/components/transfer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Suspense } from "react";

const TransferPage = () => {
  return (
    <>
      <Header title="Transfer" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/accounts">Accounts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transfer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Suspense fallback={<p>Loading transfer form...</p>}>
          <Transfer />
        </Suspense>
      </div>
    </>
  );
};

export default TransferPage;
