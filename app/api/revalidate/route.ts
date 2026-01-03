import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation API route
 * Called by CMS when content changes to immediately update portfolio site
 *
 * Security: Validates secret token before allowing revalidation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, tag, collection } = body;

    // Validate secret token
    const expectedSecret = process.env.REVALIDATE_SECRET;
    if (!expectedSecret) {
      console.error("REVALIDATE_SECRET is not set in environment variables");
      return NextResponse.json(
        { error: "Revalidation not configured" },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      console.warn("Invalid revalidation secret token");
      return NextResponse.json(
        { error: "Invalid secret token" },
        { status: 401 }
      );
    }

    // Revalidate specific path if provided
    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    // Revalidate tag if provided
    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    // Revalidate collection-specific paths
    if (collection === "posts") {
      // Revalidate blog post page
      if (path) {
        revalidatePath(path);
      }
      // Revalidate blog list page
      revalidatePath("/blog");
      revalidateTag("posts");
      console.log("Revalidated posts collection");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path: path || null,
      tag: tag || null,
    });
  } catch (error) {
    console.error("Error in revalidation route:", error);
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}
