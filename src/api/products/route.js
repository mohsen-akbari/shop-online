import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

import { extractUserId, wrapWithTryCatch } from "@/utils/api.utils";

export async function GET(request) {
  return wrapWithTryCatch(async () => {
    const foundUser = await findUser(request);

    if (!foundUser) {
      return NextResponse.json(
        {
          error: ".ابتدا وارد حساب کاربری خود شوید",
        },
        { status: 401 },
      );
    }

    try {
      const { searchParams } = new URL(request.url);

      const brand = searchParams.get("brand");
      const sort = searchParams.get("sort");
      const inventory = searchParams.get("Inventory") || "همه کالا ها";
      const pageParam = parseInt(searchParams.get("page") || "1", 10);

      const page = Math.max(pageParam, 1);

      const take = 20;
      const skip = (page - 1) * take;

      // ------------------------------------------
      // Where
      // ------------------------------------------

      const where = {};

      if (brand) {
        where.brand = {
          equals: brand,
        };
      }

      // ------------------------------------------
      // Order By
      // ------------------------------------------

      let orderBy = {};

      switch (sort) {
        case "بهترین":
          orderBy = {
            rate: "desc",
          };
          break;

        case "بدترین":
          orderBy = {
            rate: "asc",
          };
          break;

        case "ارزانترین":
          orderBy = {
            price: "asc",
          };
          break;

        case "گرانترین":
          orderBy = {
            price: "desc",
          };
          break;

        default:
          orderBy = {
            id: "desc",
          };
      }

      // فقط کالاهای موجود
      if (inventory === "کالای موجود") {
        where.stock = {
          gt: 0,
        };
      }

      // ------------------------------------------
      // گرفتن تعداد کل + محصولات
      // ------------------------------------------

      const [total, products] = await prisma.$transaction([
        prisma.product.count({
          where,
        }),

        prisma.product.findMany({
          where,
          orderBy,
          skip,
          take,
        }),
      ]);

      // ------------------------------------------
      // Pagination
      // ------------------------------------------

      const totalPages = Math.ceil(total / take);

      return NextResponse.json(
        {
          products,
          pagination: {
            page,
            take,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          },
        },
        { status: 200 },
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          error: "خطا در دریافت محصولات",
        },
        { status: 500 },
      );
    }
  });
}

async function findUser(request) {
  const userId = await extractUserId(request);

  if (!userId) {
    return null;
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!foundUser) {
    return null;
  }

  return foundUser;
}
