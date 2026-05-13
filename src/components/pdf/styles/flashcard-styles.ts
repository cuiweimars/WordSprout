import { StyleSheet } from "@react-pdf/renderer";
import { colors, PAGE } from "./pdf-theme";

const cellGap = 12;
const cols = 2;
const rows = 2;
const outerMargin = 24;
const cellW = (PAGE.width - outerMargin * 2 - cellGap * (cols - 1)) / cols;
const cellH = (PAGE.height - outerMargin * 2 - cellGap * (rows - 1)) / rows;

export const flashcardStyles = StyleSheet.create({
  pageFront: {
    padding: outerMargin,
    backgroundColor: colors.sprout[50],
  },
  pageBack: {
    padding: outerMargin,
    backgroundColor: colors.cream,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    fontSize: 10,
    color: colors.gray[500],
    fontFamily: "Helvetica",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: cellGap,
  },
  cardFront: {
    width: cellW,
    height: cellH,
    borderWidth: 1.5,
    borderColor: colors.gray[300],
    borderStyle: "dashed",
    borderRadius: 8,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBack: {
    width: cellW,
    height: cellH,
    borderWidth: 1.5,
    borderColor: colors.gray[300],
    borderStyle: "dashed",
    borderRadius: 8,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  wordFront: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    color: colors.sprout[700],
  },
  wordBack: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: colors.sprout[700],
    marginBottom: 8,
  },
  sentenceBack: {
    fontSize: 13,
    fontFamily: "Helvetica",
    color: colors.gray[700],
    textAlign: "center",
    lineHeight: 1.4,
  },
});
