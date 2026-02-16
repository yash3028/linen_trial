export const size_master = {
  "0": "XS",
  "1": "S",
  "2": "M",
  "3": "L",
  "4": "XL",
};

export const order_status_master = {
  order_initiated: "Confirmation pending",
  order_confirmed: "Order confirmed",
  order_shipped: "Order shipped",
  added_to_cart: "Added to cart",
  paid: "Payment confirmed",
};

export function get_discounted_price(
  original_price: number,
  total_items: number,
) {
  switch (total_items) {
    case 1:
      return ((95 / 100) * original_price).toFixed(2);
    case 2:
      return ((90 / 100) * original_price).toFixed(2);
    case 3:
      return ((85 / 100) * original_price).toFixed(2);
    default:
      return ((85 / 100) * original_price).toFixed(2);
  }
}

export function get_discount(total_items: number) {
  switch (total_items) {
    case 1:
      return "5% OFF";
    case 2:
      return "10% OFF";
    case 3:
      return "15% OFF";
    default:
      return "15% OFF";
  }
}
