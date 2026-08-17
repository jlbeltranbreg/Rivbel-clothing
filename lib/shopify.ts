// Shopify Storefront API client
// Docs: https://shopify.dev/docs/api/storefront

const DOMAIN  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "rivbel-jm1kwsjs.myshopify.com";
const TOKEN   = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "";
const VERSION = "2026-07";
const ENDPOINT = `https://${DOMAIN}/api/${VERSION}/graphql.json`;

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data as T;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type ShopifyVariant = {
  id: string;           // gid://shopify/ProductVariant/...
  title: string;        // "S" | "M" | "L" | "XL" | "XXL"
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; featuredImage?: { url: string } };
    price: { amount: string; currencyCode: string };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: { edges: { node: ShopifyCartLine }[] };
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
};

// ── Fragments ─────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  id
  checkoutUrl
  lines(first: 100) {
    edges { node {
      id
      quantity
      merchandise { ... on ProductVariant {
        id
        title
        product { title featuredImage { url } }
        price { amount currencyCode }
      }}
    }}
  }
  cost { subtotalAmount { amount currencyCode } }
`;

// ── Product queries ───────────────────────────────────────────────────────────

export async function getProductVariants(handle: string): Promise<ShopifyVariant[]> {
  const data = await shopifyFetch<{ product: { variants: { edges: { node: ShopifyVariant }[] } } | null }>(
    `query GetProduct($handle: String!) {
      product(handle: $handle) {
        variants(first: 10) {
          edges { node { id title availableForSale price { amount currencyCode } } }
        }
      }
    }`,
    { handle }
  );
  return (data.product?.variants.edges ?? []).map(e => e.node);
}

// ── Cart mutations ────────────────────────────────────────────────────────────

export async function cartCreate(merchandiseId: string, quantity = 1): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
    `mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { lines: [{ merchandiseId, quantity }] }
  );
  return data.cartCreate.cart;
}

export async function cartLinesAdd(cartId: string, merchandiseId: string, quantity = 1): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
    `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, lines: [{ merchandiseId, quantity }] }
  );
  return data.cartLinesAdd.cart;
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
    `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, lineIds }
  );
  return data.cartLinesRemove.cart;
}

export async function cartLinesUpdate(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>(
    `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ${CART_FRAGMENT} }
      }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return data.cartLinesUpdate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(
    `query GetCart($cartId: ID!) {
      cart(id: $cartId) { ${CART_FRAGMENT} }
    }`,
    { cartId }
  );
  return data.cart;
}
