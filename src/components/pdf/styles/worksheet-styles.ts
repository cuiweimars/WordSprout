import { StyleSheet } from "@react-pdf/renderer";
import { colors, PAGE } from "./pdf-theme";

export const worksheetStyles = StyleSheet.create({
  page: {
    padding: PAGE.marginLg,
    backgroundColor: colors.white,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.sprout[300],
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: colors.sprout[700],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.gray[500],
  },
  tracingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  tracingLabel: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: colors.gray[800],
    width: 90,
    textAlign: "right",
    paddingRight: 12,
  },
  tracingLines: {
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  tracingLine: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
    borderStyle: "dashed",
    paddingBottom: 2,
  },
  tracingText: {
    fontSize: 18,
    fontFamily: "Helvetica",
    color: colors.gray[300],
  },
  blankRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  blankNumber: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: colors.gray[500],
    width: 24,
    paddingTop: 2,
  },
  blankSentence: {
    fontSize: 14,
    fontFamily: "Helvetica",
    color: colors.gray[800],
    lineHeight: 1.6,
    flex: 1,
  },
  wordBankContainer: {
    marginTop: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  wordBankTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.gray[500],
    marginBottom: 8,
  },
  wordBankWords: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  wordBankItem: {
    fontSize: 12,
    fontFamily: "Helvetica",
    color: colors.sprout[700],
    backgroundColor: colors.sprout[50],
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  footer: {
    position: "absolute",
    bottom: PAGE.marginLg,
    left: PAGE.marginLg,
    right: PAGE.marginLg,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  footerText: {
    fontSize: 9,
    color: colors.gray[400],
  },
});
