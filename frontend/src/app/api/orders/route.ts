import { NextRequest, NextResponse } from "next/server";
import { mockEvents } from "@/lib/mockData";

let orderIdCounter = 1;

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { customerName, customerEmail, paymentMethod, items } = body;

    if (!customerName || !customerEmail || !items || !Array.isArray(items) || items.length === 0) {
        return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
    }

    // Validate all items
    const orderItems = [];
    let totalPrice = 0;

    for (const item of items) {
        const event = mockEvents.find((e) => e.id === item.eventId);
        if (!event) {
            return NextResponse.json({ message: `Evento #${item.eventId} não encontrado` }, { status: 404 });
        }
        if (event.availableTickets < item.quantity) {
            return NextResponse.json(
                { message: `Ingressos insuficientes para "${event.title}"` },
                { status: 400 },
            );
        }
        totalPrice += event.price * item.quantity;
        orderItems.push({
            eventId: item.eventId,
            quantity: item.quantity,
            unitPrice: event.price,
            event,
        });
    }

    const order = {
        id: orderIdCounter++,
        customerName,
        customerEmail,
        paymentMethod: paymentMethod || "pix",
        totalPrice,
        status: "CONFIRMED" as const,
        createdAt: new Date().toISOString(),
        items: orderItems,
    };

    return NextResponse.json(order, { status: 201 });
}
