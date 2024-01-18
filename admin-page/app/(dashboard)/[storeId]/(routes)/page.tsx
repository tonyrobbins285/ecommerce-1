import getProductsInStock from '@/actions/get-products-in-stock';
import getSaleCount from '@/actions/get-sale-count';
import getTotalRevenue from '@/actions/get-total-revenue';
import Overview from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prismadb';
import { currencyFormatter } from '@/lib/utils';
import { CreditCard, DollarSign, Package } from 'lucide-react';

type DashboardPageProps = {
  params: {
    storeId: string;
  };
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const saleCount = await getSaleCount(params.storeId);
  const productsInStock = await getProductsInStock(params.storeId);

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currencyFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sale Count</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{saleCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Products in Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productsInStock}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={[]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
