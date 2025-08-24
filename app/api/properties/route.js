import Property from "@/models/PropertySchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      type,
      furnishing,
      preference,
      available_from,
      rent,
      location,
      description,
      images,
    } = body;

    const newProperty = await Property.create({
      title,
      type,
      furnishing,
      preference,
      available_from,
      rent,
      location,
      description,
      images, // currently filenames, later replace with Cloudinary URLs
    });

    return NextResponse.json({ success: true, property: newProperty });
  } catch (error) {
    console.error("Error adding property:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
