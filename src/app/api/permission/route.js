import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email, name: session.user.name },
    });

    const permission = user?.permission;

    if (!permission) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }

    return new NextResponse(JSON.stringify(permission, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
