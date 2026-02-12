import { NextRequest, NextResponse } from "next/server";
import { mockEvents } from "@/lib/mockData";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const event = mockEvents.find((e) => e.id === Number(id));

    if (!event) {
        return NextResponse.json({ message: "Evento não encontrado" }, { status: 404 });
    }

    return NextResponse.json(event);
}
