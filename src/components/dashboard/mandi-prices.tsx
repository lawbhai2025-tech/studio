import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { mandiPrices } from "@/lib/data";

export function MandiPrices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Mandi Prices</CardTitle>
        <CardDescription>Live prices from your local market</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead className="text-right">Modal Price (₹/Quintal)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mandiPrices.map((item) => (
              <TableRow key={item.crop}>
                <TableCell>
                  <p className="font-medium">{item.crop}</p>
                  <p className="text-xs text-muted-foreground">{item.variety}</p>
                </TableCell>
                <TableCell className="text-right font-mono">{item.modalPrice.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
