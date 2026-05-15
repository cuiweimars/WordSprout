import { Document, Page, View, Text } from "@react-pdf/renderer";
import "@/components/pdf/pdf-fonts";
import { worksheetStyles } from "../styles/worksheet-styles";
import { PAGE } from "../styles/pdf-theme";

interface WordData {
  text: string;
}

interface WordSearchDocumentProps {
  words: WordData[];
  title: string;
  gradeName: string;
}

const GRID_SIZE = 12;
const CELL_SIZE = 38;
const DIRS = [
  [0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1],
];

function buildGrid(words: WordData[]): { grid: string[][]; placed: string[] } {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(""),
  );

  const sorted = [...words].sort((a, b) => b.text.length - a.text.length);
  const placed: string[] = [];

  for (const word of sorted) {
    const upper = word.text.toUpperCase();
    let success = false;

    for (let attempt = 0; attempt < 200 && !success; attempt++) {
      const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
      const [dr, dc] = dir;

      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);

      let fits = true;
      for (let i = 0; i < upper.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
          fits = false;
          break;
        }
        if (grid[r][c] !== "" && grid[r][c] !== upper[i]) {
          fits = false;
          break;
        }
      }

      if (fits) {
        for (let i = 0; i < upper.length; i++) {
          grid[row + dr * i][col + dc * i] = upper[i];
        }
        placed.push(word.text);
        success = true;
      }
    }
  }

  // Fill empty cells with random letters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = alphabet[Math.floor(Math.random() * 26)];
      }
    }
  }

  return { grid, placed };
}

export function WordSearchDocument({ words, title, gradeName }: WordSearchDocumentProps) {
  // Use up to 10 words per puzzle, chunk into multiple pages
  const chunks: WordData[][] = [];
  for (let i = 0; i < words.length; i += 10) {
    chunks.push(words.slice(i, i + 10));
  }

  const pages = chunks.map((chunk) => {
    const { grid, placed } = buildGrid(chunk);
    return { grid, placed };
  });

  return (
    <Document title={title} author="SightWordsKid">
      {pages.map((pageData, pageIdx) => (
        <Page
          key={pageIdx}
          size={{ width: PAGE.width, height: PAGE.height }}
          style={worksheetStyles.page}
        >
          {/* Header */}
          <View style={worksheetStyles.header}>
            <Text style={worksheetStyles.title}>Word Search</Text>
            <Text style={worksheetStyles.subtitle}>
              {gradeName} — {pageData.placed.length} words to find
            </Text>
          </View>

          <Text style={{ fontSize: 11, color: "#6b7280", marginBottom: 12, fontFamily: "Helvetica" }}>
            Find and circle each sight word hidden in the grid. Words can go in any direction!
          </Text>

          {/* Grid */}
          <View style={{ flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
            {pageData.grid.map((row, ri) => (
              <View key={ri} style={{ flexDirection: "row" }}>
                {row.map((cell, ci) => (
                  <View
                    key={ci}
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 0.5,
                      borderColor: "#e5e7eb",
                      backgroundColor: ri % 2 === ci % 2 ? "#fafafa" : "#ffffff",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Helvetica-Bold",
                        color: "#374151",
                      }}
                    >
                      {cell}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Word list */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
            {pageData.placed.map((word, i) => (
              <View
                key={i}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: "#bbf7d0",
                  backgroundColor: "#f0fdf4",
                }}
              >
                <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold", color: "#15803d" }}>
                  {word.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={worksheetStyles.footer} fixed>
            <Text style={worksheetStyles.footerText}>www.sightwordskid.org</Text>
            <Text style={worksheetStyles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      ))}
    </Document>
  );
}
