"use client";
import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

function ImageUpload({ image }: { image: string | undefined }) {
  const [imageUrl, setImageUrl] = useState();

  return (
    <>
      <CldUploadWidget
        onSuccess={(result, { widget }) => {
          console.log(result);

          if (result.event === "success") {
            widget.close();
            // @ts-expect-error ts no toma el tipo
            setImageUrl(result.info.secure_url);
          }
        }}
        uploadPreset="kiosconext"
        options={{ maxFiles: 1 }}
      >
        {({ open }) => (
          <>
            <div className="space-y-2">
              <label className="text-slate-800">Imagen Prodcuto</label>
              <div
                className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col jusitfy-center items-center gap-4 text-neutral-600 bg-slate-100"
                onClick={() => open()}
              >
                <TbPhotoPlus size={50} />
                <p className="text-lg font-semibold">Agregar imagen</p>
                {imageUrl && (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      fill
                      style={{ objectFit: "contain" }}
                      src={imageUrl}
                      alt="Image de Producto"
                    />
                  </div>
                )}
              </div>
            </div>

            {image && !imageUrl && (
              <div className="space-y-2 flex flex-col justify-center items-center">
                <label className="font-bold">Imagen Actual</label>
                <div className="relative w-64 h-64">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={getImagePath(image)}
                    alt="Image de Producto"
                  />
                </div>
              </div>
            )}
            <input
              type="hidden"
              name="image"
              defaultValue={imageUrl ? imageUrl : image}
            />
          </>
        )}
      </CldUploadWidget>
    </>
  );
}

export default ImageUpload;
