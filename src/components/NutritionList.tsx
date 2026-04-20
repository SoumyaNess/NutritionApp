import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import type { Nutrition } from "../types/nutrition";

import { NutritionItem } from "./NutritionItem";

export interface NutritionListProps {
  items: Nutrition[];
  onDelete: (id: number) => void;
}

export function NutritionList({ items, onDelete }: NutritionListProps) {
  if (items.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: "center" }}>
        No nutrition records yet. Add your first entry above.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label="Nutrition records">
        <TableHead>
          <TableRow>
            <TableCell>Food</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Protein</TableCell>
            <TableCell align="center" padding="checkbox" sx={{ width: 56 }}>
              {/* delete column */}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <NutritionItem
              key={item.id ?? item.foodName}
              item={item}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
