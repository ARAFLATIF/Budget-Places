import { NextResponse } from "next/server";
import { mockPlaces } from "@/lib/mockData";

export async function GET() {
  // Simulate a slight delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json(mockPlaces);
}
