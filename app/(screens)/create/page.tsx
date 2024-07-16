import cloudinary from "@/utils/cloudinary";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { MdPhotoCamera } from "react-icons/md";

const page = async () => {
  const user = await currentUser();
  const userID = user?.publicMetadata?.userId;

  const url = process.env.APP_URL as string;

  const aminAction = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as File;

    const file = await image.arrayBuffer();
    const buffer = new Uint8Array(file);

    const { secure_url }: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, data) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        })
        .end(buffer);
    });

    console.log(secure_url, title, content);

    await fetch(`http://localhost:3000/api/${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        postImage: secure_url,
      }),
    });
  };
  return (
    <div>
      <div>create personal Posts</div>

      <div>
        <form action={aminAction} className="w-[300px] mt-10">
          <div className="flex flex-col mb-3">
            <label className="font-semibold text-bold mb-2 text-[12px]">
              title
            </label>
            <input
              placeholder="title"
              type="text"
              name="title"
              className="px-2 border rounded-md h-[45px]"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label className="font-semibold text-bold mb-2 text-[12px]">
              content
            </label>
            <input
              placeholder="title"
              type="text"
              name="content"
              className="px-2 border rounded-md h-[45px]"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label
              className="font-semibold text-bold mb-2 text-[12px] cursor-pointer"
              htmlFor="image"
            >
              <MdPhotoCamera size={35} />
            </label>
            <input
              id="image"
              placeholder="content"
              type="file"
              accept="image"
              name="image"
              className="hidden px-2 border rounded-md h-[45px]"
            />
          </div>

          <button
            type="submit"
            className="my-10 bg-black text-white w-full h-[55px] flex items-center justify-center rounded-md"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
