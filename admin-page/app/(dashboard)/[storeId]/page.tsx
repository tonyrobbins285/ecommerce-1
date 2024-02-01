import { CreditCard, DollarSign, Package } from 'lucide-react';

import { prisma } from '@/lib/prismadb';
import { currencyFormatter } from '@/lib/utils';

import getSaleCount from '@/actions/get-sale-count';
import getTotalRevenue from '@/actions/get-total-revenue';
import getProductsInStock from '@/actions/get-products-in-stock';

import Overview from '@/components/overview';
import Container from '@/components/container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Wrapper from '@/components/ui/wrapper';

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
    <Container>
      <Wrapper>
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-white dark:bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Total Revenue</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-2xl font-bold">
                {currencyFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-sm font-medium">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>Sale Count</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-2xl font-bold">{saleCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="flex items-center justify-center gap-2 text-sm font-medium">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>Products in Stock</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-2xl font-bold">
                {productsInStock}
              </div>
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
      </Wrapper>
    </Container>
  );
}
