import Header from "@/components/header";
import ManageAccounts from "@/components/manage-accounts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Suspense } from "react";

const ManageAccountsPage = () => {
  return (
    <>
      <Header title="Manage Accounts" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/accounts">Accounts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Manage Accounts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Suspense fallback={<p>Loading accounts...</p>}>
          <ManageAccounts />
        </Suspense>
      </div>
    </>
  );
};

export default ManageAccountsPage;
