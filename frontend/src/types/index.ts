export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    price: number;
    imageUrl: string;
    capacity: number;
    availableTickets: number;
    category: string;
}

export interface CartItem {
    event: Event;
    quantity: number;
}

export type PaymentMethod = "pix" | "credit_card";

export interface CardData {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
}

export interface CheckoutData {
    customerName: string;
    customerEmail: string;
    paymentMethod: PaymentMethod;
    cardData?: CardData;
    items: Array<{ eventId: number; quantity: number }>;
}

export interface CreateOrderDto {
    eventId: number;
    customerName: string;
    customerEmail: string;
    quantity: number;
}

export interface Order {
    id: number;
    eventId: number;
    customerName: string;
    customerEmail: string;
    quantity: number;
    totalPrice: number;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    createdAt: string;
    event?: Event;
    items?: Array<{ eventId: number; eventTitle: string; quantity: number; unitPrice: number }>;
}
