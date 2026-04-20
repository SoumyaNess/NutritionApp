import axios from "axios";

import type { Nutrition } from "../types/nutrition";

const BASE_URL = "http://localhost:3001/nutrition";

export async function fetchNutrition(): Promise<Nutrition[]> {
  const { data } = await axios.get<Nutrition[]>(BASE_URL);
  return data;
}

export async function addNutrition(
  entry: Omit<Nutrition, "id">,
): Promise<Nutrition> {
  const { data } = await axios.post<Nutrition>(BASE_URL, entry);
  return data;
}

export async function deleteNutrition(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}
