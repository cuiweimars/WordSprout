import { StyleSheet } from "@react-pdf/renderer";
import { colors, PAGE } from "./pdf-theme";

const margin = 24;
const gap = 12;
const cols = 2;
const rows = 2;
const usableW = PAGE.width - margin * 2;
const usableH = PAGE.height - margin * 2;
const headerH = 20;
const gridH = usableH - headerH - 8;
const cellW = (usableW - gap * (cols - 1)) / cols;
const cellH = (gridH - gap * (rows - 1)) / rows;

export const flashcardStyles = StyleSheet.create({
  page: {
    padding: margin,
    backgroundColor: colors.sprout[50],
  },
  header: {
    height: headerH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 10,
    color: colors.gray[500],
    fontFamily: "Helvetica",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: gap,
  },
  rowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
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
