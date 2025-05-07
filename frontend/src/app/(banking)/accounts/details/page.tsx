import AccountDetails from "@/components/account-details";
import Header from "@/components/header";
import TransactionHistory from "@/components/transaction-history";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AccountDetailsPage = () => {
  return (
    <>
      <Header title="Account Details" />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/accounts">Accounts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Account Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Tabs defaultValue="accountInformation">
          <TabsList>
            <TabsTrigger value="accountInformation">
              Account Information
            </TabsTrigger>
            <TabsTrigger value="transactionHistory">
              Transaction History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="accountInformation">
            <h1 className="text-xl font-semibold mb-4 lg:mb-6">
              Account Information
            </h1>
            <Suspense fallback={<p>Loading account details...</p>}>
              <AccountDetails />
            </Suspense>
          </TabsContent>
          <TabsContent value="transactionHistory">
            <h1 className="text-xl font-semibold mb-4 lg:mb-6">
              Transaction History
            </h1>
            <Suspense fallback={<p>Loading transaction history...</p>}>
              <TransactionHistory />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AccountDetailsPage;
