import { Document, Page, View, Text } from "@react-pdf/renderer";
import "@/components/pdf/pdf-fonts";
import { flashcardStyles } from "../styles/flashcard-styles";
import { chunkArray } from "@/lib/pdf-helpers";
import { PAGE } from "../styles/pdf-theme";

interface WordData {
  text: string;
  exampleSentence: string;
}

interface FlashcardDocumentProps {
  words: WordData[];
  title: string;
}

const CARDS_PER_PAGE = 4;

function CardRow({
  cards,
  isLast,
  isFront,
}: {
  cards: (WordData | null)[];
  isLast: boolean;
  isFront: boolean;
}): React.ReactElement {
  return (
    <View style={isLast ? flashcardStyles.rowLast : flashcardStyles.row}>
      {cards.map((word, i) => (
        <View
          key={i}
          style={isFront ? flashcardStyles.cardFront : flashcardStyles.cardBack}
        >
          {word && (
            <>
              {isFront ? (
                <Text style={flashcardStyles.wordFront}>{word.text}</Text>
              ) : (
                <>
                  <Text style={flashcardStyles.wordBack}>{word.text}</Text>
                  <Text style={flashcardStyles.sentenceBack}>
                    {word.exampleSentence}
                  </Text>
                </>
              )}
            </>
          )}
        </View>
      ))}
    </View>
  );
}

function makeRows(chunk: WordData[]): (WordData | null)[][] {
  const rows: (WordData | null)[][] = [];
  for (let r = 0; r < 2; r++) {
    const row: (WordData | null)[] = [];
    for (let c = 0; c < 2; c++) {
      const idx = r * 2 + c;
      row.push(idx < chunk.length ? chunk[idx] : null);
    }
    rows.push(row);
  }
  return rows;
}

function makeBackRows(chunk: WordData[]): (WordData | null)[][] {
  // Reverse the chunk so back sides align when printed duplex (flip on long edge)
  // For a 2x2 grid: reverse left-right in each row, and reverse row order
  const padded: (WordData | null)[] = [];
  for (let i = 0; i < CARDS_PER_PAGE; i++) {
    padded.push(i < chunk.length ? chunk[i] : null);
  }
  // Row 0 gets cards [1,0] reversed, Row 1 gets cards [3,2] reversed
  const rows: (WordData | null)[][] = [
    [padded[1], padded[0]],
    [padded[3], padded[2]],
  ];
  return rows;
}

export function FlashcardDocument({ words, title }: FlashcardDocumentProps) {
  const chunks = chunkArray(words, CARDS_PER_PAGE);

  const pages: React.ReactElement[] = [];
  chunks.forEach((chunk, pageIdx) => {
    const frontRows = makeRows(chunk);
    const backRows = makeBackRows(chunk);

    // Front page
    pages.push(
      <Page key={`f-${pageIdx}`} size={{ width: PAGE.width, height: PAGE.height }} style={flashcardStyles.page}>
        <View style={flashcardStyles.header}>
          <Text style={flashcardStyles.headerText}>{title}</Text>
          <Text style={flashcardStyles.headerText}>Page {pageIdx * 2 + 1} (front)</Text>
        </View>
        {frontRows.map((row, ri) => (
          <CardRow key={`fr-${ri}`} cards={row} isLast={ri === frontRows.length - 1} isFront={true} />
        ))}
      </Page>,
    );

    // Back page
    pages.push(
      <Page key={`b-${pageIdx}`} size={{ width: PAGE.width, height: PAGE.height }} style={flashcardStyles.page}>
        <View style={flashcardStyles.header}>
          <Text style={flashcardStyles.headerText}>{title} (back)</Text>
          <Text style={flashcardStyles.headerText}>Page {pageIdx * 2 + 2}</Text>
        </View>
        {backRows.map((row, ri) => (
          <CardRow key={`br-${ri}`} cards={row} isLast={ri === backRows.length - 1} isFront={false} />
        ))}
      </Page>,
    );
  });

  return (
    <Document title={title} author="SightWordsKid">
      {pages}
    </Document>
  );
}
