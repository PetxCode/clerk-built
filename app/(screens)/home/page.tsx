import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const page = async () => {
  const user = await currentUser();
  const userID = user?.publicMetadata?.userId;

  const url = process.env.APP_URL as string;
  const res = await fetch(`${url}/api/${userID}`, {
    method: "GET",
    cache: "no-cache",
    next: {
      tags: ["posted"],
    },
  });

  const data = await res.json();
  return (
    <div>
      <div>view all posts:</div>

      <div className="my-5">
        <div className="flex gap-2 flex-wrap w-full">
          {data.data?.posts.map((post: any) => (
            <div
              key={post._id}
              className="w-[250px] h-[350px] border rounded-md overflow-hidden "
            >
              <Image
                width={1000}
                height={1000}
                src={post.postImage}
                alt={post.title}
                className="w-full h-[270px] "
              />
              <div className="p-2">
                <p className="font-semibold uppercase text-[12px]">
                  {post.title}
                </p>
                <p className="text-[12px] mt-2">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
