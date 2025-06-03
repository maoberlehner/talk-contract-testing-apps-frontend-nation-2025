import { Card, CardContent } from "@/components/ui/card";
import { ShoppingListClient } from "@/app/shopping-list-client";
import { getAllItems } from "@/repositories/shopping-list";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getAllItems();

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-2xl font-bold">Shopping List</h1>
        <Card>
          <CardContent className="p-6">
            <ShoppingListClient items={items} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
