import { Document, Page, View, Text } from "@react-pdf/renderer";
import "@/components/pdf/pdf-fonts";
import { worksheetStyles } from "../styles/worksheet-styles";
import { chunkArray } from "@/lib/pdf-helpers";
import { PAGE } from "../styles/pdf-theme";

interface WordData {
  text: string;
}

interface TracingDocumentProps {
  words: WordData[];
  title: string;
  gradeName: string;
}

const WORDS_PER_PAGE = 8;

export function TracingDocument({ words, title, gradeName }: TracingDocumentProps) {
  const pages = chunkArray(words, WORDS_PER_PAGE);

  return (
    <Document title={title} author="SightWordsKid">
      {pages.map((pageWords, pageIdx) => (
        <Page
          key={pageIdx}
          size={{ width: PAGE.width, height: PAGE.height }}
          style={worksheetStyles.page}
        >
          {/* Header */}
          <View style={worksheetStyles.header}>
            <Text style={worksheetStyles.title}>Sight Word Tracing Practice</Text>
            <Text style={worksheetStyles.subtitle}>{gradeName} — {words.length} words</Text>
          </View>

          {/* Tracing rows */}
          {pageWords.map((word, wordIdx) => {
            const globalIdx = pageIdx * WORDS_PER_PAGE + wordIdx + 1;
            const letters = word.text.split("");

            return (
              <View key={wordIdx} style={worksheetStyles.tracingRow}>
                <Text style={worksheetStyles.tracingLabel}>
                  {globalIdx}. {word.text}
                </Text>
                <View style={worksheetStyles.tracingLines}>
                  {[0, 1, 2].map((line) => (
                    <View key={line} style={worksheetStyles.tracingLine}>
                      {letters.map((letter, li) => (
                        <Text key={li} style={worksheetStyles.tracingText}>
                          {line === 0 ? letter : ""}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            );
          })}

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
