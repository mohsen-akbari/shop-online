import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } =  params;

    const product = await prisma.product.findFirst({ where: { id: id } });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
