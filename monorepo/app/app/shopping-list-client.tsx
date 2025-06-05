"use client";

import { Plus, RotateCcw, Square, Star,Trash2 } from "lucide-react";
import { useActionState, useState } from "react";

import { updateShoppingList } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RatingModal } from "@/components/ui/rating-modal";
import { StarRating } from "@/components/ui/star-rating";
import { cn } from "@/lib/utils";
import type { ShoppingListItem } from "@/repositories/shopping-list";

export function ShoppingListClient({
  items: itemsInitial,
}: {
  items: ShoppingListItem[];
}) {
  const [items, updateShoppingListAction, isPending] = useActionState(
    updateShoppingList,
    itemsInitial,
  );
  const [ratingModal, setRatingModal] = useState<{
    isOpen: boolean;
    productId: string;
    productName: string;
  }>({
    isOpen: false,
    productId: "",
    productName: "",
  });
  const pendingItems = items.filter((item) => !item.completed);
  const completedItems = items.filter((item) => item.completed);

  const openRatingModal = (productId: string, productName: string) => {
    setRatingModal({
      isOpen: true,
      productId,
      productName,
    });
  };

  const closeRatingModal = () => {
    setRatingModal({
      isOpen: false,
      productId: "",
      productName: "",
    });
  };

  return (
    <div className="space-y-6">
      <form action={updateShoppingListAction} className="flex gap-2">
        <label htmlFor="name" className="sr-only">
          New item
        </label>
        <Input
          name="name"
          id="name"
          placeholder="Add new item..."
          className="flex-1"
          required
        />
        <input type="hidden" name="action" value="CREATE" />
        <Button disabled={isPending} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add item
        </Button>
      </form>

      <div className="space-y-2">
        {pendingItems.length > 0 && (
          <div className="text-muted-foreground mb-2 text-sm font-medium">
            Shopping List ({pendingItems.length})
          </div>
        )}
        {pendingItems.map((item) => {
          return (
            <form
              key={item.id}
              action={updateShoppingListAction}
              className="bg-card flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="action" value="TOGGLE" />
              <button
                className={cn(
                  "text-card-foreground flex items-center gap-3 rounded px-2 py-1 transition-colors hover:bg-blue-50 hover:text-blue-600",
                  isPending && "opacity-70",
                )}
                disabled={isPending}
              >
                <Square className="h-4 w-4 flex-shrink-0" />
                {item.name}
              </button>
              <div className="flex items-center gap-2">
                <StarRating
                  rating={Math.round(item.rating?.average || 0)}
                  readonly
                  size="sm"
                />
                <button
                  type="button"
                  onClick={() => openRatingModal(item.productId, item.name)}
                  className="rounded p-2 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  <Star className="h-4 w-4" />
                  <span className="sr-only">Rate {item.name}</span>
                </button>
              </div>
            </form>
          );
        })}
      </div>

      {pendingItems.length === 0 && (
        <div className="text-muted-foreground py-4 text-center">
          No items in your shopping list. Add some items above!
        </div>
      )}

      {completedItems.length > 0 && (
        <div className="space-y-2">
          <div className="text-muted-foreground mb-2 text-sm font-medium">
            Completed ({completedItems.length})
          </div>
          {completedItems.map((item) => (
            <div
              key={item.id}
              className="bg-muted/30 flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <form action={updateShoppingListAction}>
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="action" value="TOGGLE" />
                <button
                  className="text-muted-foreground flex items-center gap-3 rounded px-2 py-1 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  disabled={isPending}
                >
                  <RotateCcw className="h-4 w-4 flex-shrink-0 text-blue-600" />
                  <span className="line-through">{item.name}</span>
                </button>
              </form>
              <form action={updateShoppingListAction} className="flex-shrink-0">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="action" value="DELETE" />
                <button
                  className="rounded p-2 transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Remove item"
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete item {item.name}</span>
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      <RatingModal
        isOpen={ratingModal.isOpen}
        onClose={closeRatingModal}
        productId={ratingModal.productId}
        productName={ratingModal.productName}
        formAction={updateShoppingListAction}
      />
    </div>
  );
}
