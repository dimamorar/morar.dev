"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type ImageWithSkeletonProps = ImageProps & {
  wrapperClassName?: string;
  skeletonClassName?: string;
};

export function ImageWithSkeleton({
  wrapperClassName,
  skeletonClassName,
  className,
  loading,
  priority,
  width,
  height,
  alt,
  onLoadingComplete,
  onLoad,
  onError,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const aspectRatio =
    typeof width === "number" && typeof height === "number"
      ? `${width} / ${height}`
      : undefined;

  const handleLoaded = (img?: HTMLImageElement) => {
    setIsLoaded(true);
    if (img) {
      onLoadingComplete?.(img);
    }
  };

  const handleError: ImageProps["onError"] = (event) => {
    setIsLoaded(true);
    onError?.(event);
  };

  const handleLoad: ImageProps["onLoad"] = (event) => {
    const target = event.currentTarget as HTMLImageElement | null;
    handleLoaded(target ?? undefined);
    onLoad?.(event);
  };

  return (
    <span
      className={["image-skeleton-wrapper", wrapperClassName]
        .filter(Boolean)
        .join(" ")}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <span
        className={[
          "image-skeleton",
          isLoaded ? "is-loaded" : "",
          skeletonClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />
      <Image
        {...props}
        alt={alt ?? ""}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : loading ?? "lazy"}
        className={["image-skeleton-element", className]
          .filter(Boolean)
          .join(" ")}
        onLoad={handleLoad}
        onError={handleError}
      />
    </span>
  );
}
