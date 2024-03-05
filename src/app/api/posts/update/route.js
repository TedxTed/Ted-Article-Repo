import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
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

    if (permission !== "owner" && permission !== "admin") {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }),
        { status: 401 }
      );
    }

    const body = await req.json();
    const postId = body.id;
    const { id, ...dataNeedToUpdata } = body;

    if (!postId) {
      return new NextResponse(
        JSON.stringify({ message: "Post ID is required!" }, { status: 400 })
      );
    }

    const post = await prisma.post.update({
      where: { id: postId },
      data: { ...dataNeedToUpdata, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: JSON.stringify(err) }, { status: 500 })
    );
  }
};
