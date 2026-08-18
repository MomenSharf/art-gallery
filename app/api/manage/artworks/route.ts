import { createHmac, timingSafeEqual } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


const SESSION_COOKIE = "manage_session";

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not configured.");
  }

  return password;
}

function getManageSecret() {
  return (
    process.env.MANAGE_SECRET ??
    getAdminPassword()
  );
}

function createSessionToken() {
  return createHmac("sha256", getManageSecret())
    .update("portfolio-manage-session")
    .digest("hex");
}

function isAuthenticated(request: NextRequest) {
  const token =
    request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) return false;

  const expected = createSessionToken();

  if (token.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expected),
  );
}

function text(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function parseYear(value: unknown) {
  const year =
    typeof value === "number"
      ? value
      : Number(value);

  if (
    !Number.isInteger(year) ||
    year < 1900 ||
    year > 2100
  ) {
    return null;
  }

  return year;
}

function parseColors(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (color): color is string =>
      typeof color === "string" &&
      /^#[0-9a-fA-F]{6}$/.test(color),
  );
}

function parseImage(value: unknown) {
  const image = text(value);

  if (!image) return null;

  try {
    const url = new URL(image);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function parseArtwork(body: Record<string, unknown>) {
  const title = text(body.title);
  const description = text(body.description);
  const category = text(body.category);
  const year = parseYear(body.year);
  const image = parseImage(body.image);
  const colors = parseColors(body.colors);

  if (
    !title ||
    !description ||
    !category ||
    year === null ||
    !image ||
    colors.length === 0 ||
    colors.length > 5
  ) {
    return null;
  }

  return {
    title,
    description,
    category,
    year,
    image,
    colors,
  };
}

function unauthorized() {
  return NextResponse.json(
    { error: "غير مصرح لك" },
    { status: 401 },
  );
}

/* GET */

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return unauthorized();
  }

  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      artworks,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "تعذر تحميل الأعمال" },
      { status: 500 },
    );
  }
}

/* POST */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<
      string,
      unknown
    >;

    /* Login */
    if (body.action === "login") {
      const password = text(body.password);

      if (!password) {
        return NextResponse.json(
          { error: "أدخل كلمة المرور" },
          { status: 400 },
        );
      }

      if (password !== getAdminPassword()) {
        return NextResponse.json(
          { error: "كلمة المرور غير صحيحة" },
          { status: 401 },
        );
      }

      const response = NextResponse.json({
        success: true,
      });

      response.cookies.set({
        name: SESSION_COOKIE,
        value: createSessionToken(),
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    /* Create artwork */
    if (body.action === "create") {
      if (!isAuthenticated(request)) {
        return unauthorized();
      }

      const data = parseArtwork(body);

      if (!data) {
        return NextResponse.json(
          {
            error:
              "تأكد من إدخال جميع البيانات بشكل صحيح",
          },
          { status: 400 },
        );
      }

      const artwork = await prisma.artwork.create({
        data,
      });

      return NextResponse.json(
        {
          success: true,
          artwork,
        },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { error: "عملية غير معروفة" },
      { status: 400 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "حدث خطأ في الخادم" },
      { status: 500 },
    );
  }
}

/* PUT */

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as Record<
      string,
      unknown
    >;

    const id = text(body.id);

    if (!id) {
      return NextResponse.json(
        { error: "العمل غير محدد" },
        { status: 400 },
      );
    }

    const data = parseArtwork(body);

    if (!data) {
      return NextResponse.json(
        {
          error:
            "تأكد من إدخال جميع البيانات بشكل صحيح",
        },
        { status: 400 },
      );
    }

    const artwork =
      await prisma.artwork.update({
        where: {
          id,
        },
        data,
      });

    return NextResponse.json({
      success: true,
      artwork,
    });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      { error: "العمل غير موجود أو تعذر تعديله" },
      { status: 404 },
    );
  }
}

/* DELETE */

export async function DELETE(
  request: NextRequest,
) {
  if (!isAuthenticated(request)) {
    return unauthorized();
  }

  try {
    const body = (await request.json()) as {
      id?: unknown;
    };

    const id = text(body.id);

    if (!id) {
      return NextResponse.json(
        { error: "العمل غير محدد" },
        { status: 400 },
      );
    }

    await prisma.artwork.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { error: "العمل غير موجود" },
      { status: 404 },
    );
  }
}