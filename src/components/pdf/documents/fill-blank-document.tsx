import { Document, Page, View, Text } from "@react-pdf/renderer";
import "@/components/pdf/pdf-fonts";
import { worksheetStyles } from "../styles/worksheet-styles";
import { chunkArray, createBlankedSentence, shuffleArray } from "@/lib/pdf-helpers";
import { PAGE } from "../styles/pdf-theme";

interface WordData {
  text: string;
  exampleSentence: string;
}

interface FillBlankDocumentProps {
  words: WordData[];
  title: string;
  gradeName: string;
}

const WORDS_PER_PAGE = 5;

export function FillBlankDocument({ words, title, gradeName }: FillBlankDocumentProps) {
  const pages = chunkArray(words, WORDS_PER_PAGE);

  return (
    <Document title={title} author="SightWordsKid">
      {pages.map((pageWords, pageIdx) => {
        const shuffledBank = shuffleArray(pageWords.map((w) => w.text));

        return (
          <Page
            key={pageIdx}
            size={{ width: PAGE.width, height: PAGE.height }}
            style={worksheetStyles.page}
          >
            {/* Header */}
            <View style={worksheetStyles.header}>
              <Text style={worksheetStyles.title}>Fill in the Blank</Text>
              <Text style={worksheetStyles.subtitle}>{gradeName}</Text>
            </View>

            {/* Sentence rows */}
            {pageWords.map((word, wordIdx) => {
              const globalIdx = pageIdx * WORDS_PER_PAGE + wordIdx + 1;
              const blanked = createBlankedSentence(word.exampleSentence, word.text);

              return (
                <View key={wordIdx} style={worksheetStyles.blankRow}>
                  <Text style={worksheetStyles.blankNumber}>{globalIdx}.</Text>
                  <Text style={worksheetStyles.blankSentence}>{blanked}</Text>
                </View>
              );
            })}

            {/* Word bank */}
            <View style={worksheetStyles.wordBankContainer}>
              <Text style={worksheetStyles.wordBankTitle}>Word Bank:</Text>
              <View style={worksheetStyles.wordBankWords}>
                {shuffledBank.map((word, i) => (
                  <Text key={i} style={worksheetStyles.wordBankItem}>{word}</Text>
                ))}
              </View>
            </View>

            {/* Footer */}
            <View style={worksheetStyles.footer} fixed>
              <Text style={worksheetStyles.footerText}>www.sightwordskid.org</Text>
              <Text
                style={worksheetStyles.footerText}
                render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
              />
            </View>
          </Page>
        );
      })}
    </Document>
  );
}
