import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AddNutrition } from "./components/AddNutrition";
import { NutritionList } from "./components/NutritionList";
import * as nutritionApi from "./services/api";
import type { Nutrition } from "./types/nutrition";

const theme = createTheme({
  typography: {
    fontFamily:
      '"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  palette: {
    mode: "light",
    primary: { main: "#2e7d32" },
    secondary: { main: "#1565c0" },
    background: { default: "#f4f7f5", paper: "#ffffff" },
  },
});

export default function App() {
  const [nutritionList, setNutritionList] = useState<Nutrition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await nutritionApi.fetchNutrition();
      setNutritionList(data);
    } catch {
      setError(
        "Could not load nutrition data. Start JSON Server: npm run server",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const totalCalories = useMemo(() => {
    return nutritionList.reduce((sum, item) => sum + item.calories, 0);
  }, [nutritionList]);

  async function handleAdd(entry: Omit<Nutrition, "id">) {
    try {
      const created = await nutritionApi.addNutrition(entry);
      setNutritionList((prev) => [...prev, created]);
      setError(null);
    } catch {
      setError("Could not add entry. Is JSON Server running on port 3001?");
    }
  }

  async function handleDelete(id: number) {
    try {
      await nutritionApi.deleteNutrition(id);
      setNutritionList((prev) => prev.filter((n) => n.id !== id));
      setError(null);
    } catch {
      setError("Could not delete entry. Check your connection and try again.");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          py: { xs: 3, sm: 5 },
          background:
            "linear-gradient(165deg, #e8f5e9 0%, #f4f7f5 40%, #e3f2fd 100%)",
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                Nutrition Tracker
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your food entries. Run the API with{" "}
                <Typography component="span" variant="body2" sx={{ fontFamily: "monospace" }}>
                  npm run server
                </Typography>
                .
              </Typography>
            </Box>

            {error && <Alert severity="warning">{error}</Alert>}

            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Add entry
              </Typography>
              <AddNutrition onSubmit={handleAdd} />
            </Box>

            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
                flexWrap="wrap"
                gap={1}
                sx={{ mb: 1.5 }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Log of food entries
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total calories:{" "}
                  <Typography component="span" fontWeight={700} color="primary.main">
                    {loading ? "—" : totalCalories}
                  </Typography>
                </Typography>
              </Stack>

              {loading ? (
                <Typography color="text.secondary">Loading…</Typography>
              ) : (
                <NutritionList items={nutritionList} onDelete={handleDelete} />
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
