export async function GET(req, context) {
  try {
    const { params } = context;
    const type = params.type?.toLowerCase();

    // allowed categories
    const allowedTypes = ["flat", "room", "hostel", "all"];

    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid property type" },
        { status: 400 }
      );
    }

    let query = {};
    if (type !== "all") {
      query.type = type;
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    console.error("Error fetching properties by type:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}