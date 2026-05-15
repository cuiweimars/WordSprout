import { Document, Page, View, Text } from "@react-pdf/renderer";
import "@/components/pdf/pdf-fonts";
import { worksheetStyles } from "../styles/worksheet-styles";
import { chunkArray, shuffleArray } from "@/lib/pdf-helpers";
import { PAGE } from "../styles/pdf-theme";

interface WordData {
  text: string;
  exampleSentence: string;
}

interface WordMatchingDocumentProps {
  words: WordData[];
  title: string;
  gradeName: string;
}

const PAIRS_PER_PAGE = 5;

export function WordMatchingDocument({ words, title, gradeName }: WordMatchingDocumentProps) {
  const chunks = chunkArray(words, PAIRS_PER_PAGE);

  return (
    <Document title={title} author="SightWordsKid">
      {chunks.map((pageWords, pageIdx) => {
        const shuffledSentences = shuffleArray(pageWords);

        return (
          <Page
            key={pageIdx}
            size={{ width: PAGE.width, height: PAGE.height }}
            style={worksheetStyles.page}
          >
            {/* Header */}
            <View style={worksheetStyles.header}>
              <Text style={worksheetStyles.title}>Word Matching</Text>
              <Text style={worksheetStyles.subtitle}>{gradeName} — Page {pageIdx + 1}</Text>
            </View>

            <Text style={{ fontSize: 11, color: "#6b7280", marginBottom: 12, fontFamily: "Helvetica" }}>
              Draw a line from each word on the left to its matching sentence on the right.
            </Text>

            {/* Left column: words, Right column: shuffled sentences */}
            <View style={{ flexDirection: "row" }}>
              {/* Words column */}
              <View style={{ width: "28%", marginRight: 16 }}>
                {pageWords.map((word, i) => (
                  <View
                    key={`w-${i}`}
                    style={{
                      height: 64,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 8,
                      borderWidth: 1.5,
                      borderColor: "#bbf7d0",
                      borderRadius: 8,
                      backgroundColor: "#f0fdf4",
                    }}
                  >
                    <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", color: "#15803d" }}>
                      {i + 1}. {word.text}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Middle: drawing space */}
              <View style={{ width: "8%", justifyContent: "center", alignItems: "center", paddingTop: 20 }}>
                {pageWords.map((_, i) => (
                  <View key={`arrow-${i}`} style={{ height: 72, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 12, color: "#d1d5db" }}>→</Text>
                  </View>
                ))}
              </View>

              {/* Sentences column (shuffled) */}
              <View style={{ flex: 1 }}>
                {shuffledSentences.map((word, i) => {
                  const letter = String.fromCharCode(65 + i);
                  return (
                    <View
                      key={`s-${i}`}
                      style={{
                        height: 64,
                        justifyContent: "center",
                        marginBottom: 8,
                        paddingLeft: 10,
                        paddingRight: 8,
                        borderWidth: 1.5,
                        borderColor: "#bfdbfe",
                      borderRadius: 8,
                      backgroundColor: "#eff6ff",
                      }}
                    >
                      <Text style={{ fontSize: 11, fontFamily: "Helvetica", color: "#374151", lineHeight: 1.4 }}>
                        <Text style={{ fontFamily: "Helvetica-Bold", color: "#1d4ed8" }}>{letter}. </Text>
                        {word.exampleSentence}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Answer key hint */}
            <View style={{ position: "absolute", bottom: 50, left: PAGE.marginLg, right: PAGE.marginLg }}>
              <Text style={{ fontSize: 8, color: "#d1d5db", fontFamily: "Helvetica" }}>
                Answer key: {pageWords.map((w, i) => `${i + 1}→${String.fromCharCode(65 + shuffledSentences.indexOf(w))}`).join("  ")}
              </Text>
            </View>

            {/* Footer */}
            <View style={worksheetStyles.footer} fixed>
              <Text style={worksheetStyles.footerText}>www.sightwordskid.org</Text>
              <Text style={worksheetStyles.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
            </View>
          </Page>
        );
      })}
    </Document>
  );
}
