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

export function FlashcardDocument({ words, title }: FlashcardDocumentProps) {
  const chunks = chunkArray(words, CARDS_PER_PAGE);
  const totalPages = chunks.length;

  return (
    <Document title={title} author="SightWordsKid">
      {chunks.map((chunk, pageIdx) => (
        <Page key={`f-${pageIdx}`} size={{ width: PAGE.width, height: PAGE.height }} style={flashcardStyles.pageFront}>
          <View style={flashcardStyles.header}>
            <Text style={flashcardStyles.headerText}>{title}</Text>
            <Text style={flashcardStyles.headerText}>Page {pageIdx * 2 + 1} of {totalPages * 2} (front)</Text>
          </View>
          <View style={flashcardStyles.grid}>
            {chunk.map((word, i) => (
              <View key={`f-${pageIdx}-${i}`} style={flashcardStyles.cardFront}>
                <Text style={flashcardStyles.wordFront}>{word.text}</Text>
              </View>
            ))}
            {/* Pad empty cells for consistent layout */}
            {Array.from({ length: CARDS_PER_PAGE - chunk.length }).map((_, i) => (
              <View key={`f-empty-${i}`} style={flashcardStyles.cardFront} />
            ))}
          </View>
        </Page>
      ))}

      {/* Back pages */}
      {chunks.map((chunk, pageIdx) => (
        <Page key={`b-${pageIdx}`} size={{ width: PAGE.width, height: PAGE.height }} style={flashcardStyles.pageBack}>
          <View style={flashcardStyles.header}>
            <Text style={flashcardStyles.headerText}>{title} (back)</Text>
            <Text style={flashcardStyles.headerText}>Page {pageIdx * 2 + 2} of {totalPages * 2}</Text>
          </View>
          <View style={flashcardStyles.grid}>
            {chunk.map((word, i) => (
              <View key={`b-${pageIdx}-${i}`} style={flashcardStyles.cardBack}>
                <Text style={flashcardStyles.wordBack}>{word.text}</Text>
                <Text style={flashcardStyles.sentenceBack}>{word.exampleSentence}</Text>
              </View>
            ))}
            {Array.from({ length: CARDS_PER_PAGE - chunk.length }).map((_, i) => (
              <View key={`b-empty-${i}`} style={flashcardStyles.cardBack} />
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
}
