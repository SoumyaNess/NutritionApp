import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, type FormEvent } from "react";

import type { Nutrition } from "../types/nutrition";

export interface AddNutritionProps {
  onSubmit: (entry: Omit<Nutrition, "id">) => Promise<void>;
}

export function AddNutrition({ onSubmit }: AddNutritionProps) {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const c = Number(calories);
    const p = Number(protein);
    if (!foodName.trim() || Number.isNaN(c) || Number.isNaN(p)) return;
    setSubmitting(true);
    try {
      await onSubmit({ foodName: foodName.trim(), calories: c, protein: p });
      setFoodName("");
      setCalories("");
      setProtein("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)}>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} useFlexGap flexWrap="wrap">
        <TextField
          required
          label="Food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          disabled={submitting}
          sx={{ flex: "1 1 200px", minWidth: 0 }}
        />
        <TextField
          required
          type="number"
          label="Calories"
          inputProps={{ min: 0, step: "any" }}
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          disabled={submitting}
          sx={{ width: { xs: "100%", sm: 140 } }}
        />
        <TextField
          required
          type="number"
          label="Protein (g)"
          inputProps={{ min: 0, step: "any" }}
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          disabled={submitting}
          sx={{ width: { xs: "100%", sm: 140 } }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          startIcon={
            submitting ? (
              <CircularProgress color="inherit" size={18} />
            ) : (
              <AddIcon />
            )
          }
          sx={{ alignSelf: { xs: "stretch", sm: "center" } }}
        >
          Add entry
        </Button>
      </Stack>
    </form>
  );
}
