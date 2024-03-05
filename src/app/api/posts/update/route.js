import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  let userReturn;
  let permissionReturn;
  let checkReturn;
  let bodyReturn;
  let postReturn;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email, name: session.user.name },
    });

    console.log(user);
    userReturn = user;

    const permission = user?.permission;

    permissionReturn = permission;
    checkReturn = permission !== "owner" && permission !== "admin";

    if (permission !== "owner" && permission !== "admin") {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }),
        { status: 401 }
      );
    }

    const body = await req.json();
    bodyReturn = body;
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

    postReturn = post;

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      {
        userReturn,
        permissionReturn,
        checkReturn,
        bodyReturn,
        postReturn,
      },
      { status: 500 }
    );
  }
};
