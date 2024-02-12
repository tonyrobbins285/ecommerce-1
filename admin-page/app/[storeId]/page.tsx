import { CreditCard, DollarSign, Package } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Overview } from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { getTotalRevenue } from '@/actions/get-total-revenue';
import { getSalesCount } from '@/actions/get-sales-count';
import { getGraphRevenue } from '@/actions/get-graph-revenue';
import { getStockCount } from '@/actions/get-stock-count';
import { currencyFormatter } from '@/lib/utils';
import Container from '@/components/ui/container';
import Wrapper from '@/components/ui/wrapper';

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);

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
              <div className="text-center text-2xl font-bold">{salesCount}</div>
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
              <div className="text-center text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default DashboardPage;
