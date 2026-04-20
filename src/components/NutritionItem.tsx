import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

import type { Nutrition } from "../types/nutrition";

export interface NutritionItemProps {
  item: Nutrition;
  onDelete: (id: number) => void;
}

export function NutritionItem({ item, onDelete }: NutritionItemProps) {
  const id = item.id;
  const canDelete = id != null;

  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        {item.foodName}
      </TableCell>
      <TableCell align="right">{item.calories}</TableCell>
      <TableCell align="right">{item.protein} g</TableCell>
      <TableCell align="center" padding="checkbox" sx={{ width: 56 }}>
        <Tooltip title="Delete">
          <span>
            <IconButton
              edge="end"
              size="small"
              color="error"
              disabled={!canDelete}
              onClick={() => canDelete && onDelete(id)}
              aria-label={`Delete ${item.foodName}`}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
