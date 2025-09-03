import Property from "@/models/PropertySchema";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const property = await Property.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        { success: false, message: "Not found" },
        { status: 404 }
      );
    }

    property._id = property._id.toString();
    property.createdAt = property.createdAt?.toISOString();
    property.updatedAt = property.updatedAt?.toISOString();

    return NextResponse.json({ success: true, data: property });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
