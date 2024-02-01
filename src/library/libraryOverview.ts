const books = [
  {
    language: "de",
    type: "book",
    title: "some book 1",
  },
  {
    language: "uk",
    type: "transformer",
    title: "some book 4",
  },
  {
    language: "en",
    type: "book",
    title: "some book 9",
  },
  {
    language: "en",
    type: "book",
    title: "some book 6",
  },
  {
    language: "de",
    type: "auto",
    title: "some book 3",
  },
  {
    language: "en",
    type: "book",
    title: "some book 88",
  },
];

const libraryOverview = ({ filter = null }, { languages = [] }) => {
  //@ts-expect-error
  const understoodContent = books.filter(({ language }) => languages[language]);

  if (filter) {
    return understoodContent.filter(({ type }) => type === filter);
  }
  return understoodContent;
};
export default libraryOverview;
