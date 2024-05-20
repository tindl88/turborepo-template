import { Card, CardContent, CardHeader, CardTitle } from '@ui/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/components/ui/select';

export default function ProductFormProduct() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <Select>
            <SelectTrigger id="product" aria-label="Select product">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
