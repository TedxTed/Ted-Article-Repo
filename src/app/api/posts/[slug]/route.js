import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// GET SINGLE POST
export const PUT = async (req, { params }) => {
  const { slug } = params;

  try {
    // 解析請求的 body
    const { id, data } = await req.json();
    console.log("Request body:", { id, data });

    // 使用 Prisma 更新 Post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { content: data },
    });

    return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
