exports.linkResolver = (doc) => {
  switch (doc.type) {
    case "page":
      return `/${doc.uid}`;

    default:
      if (!doc.uid) return "/";
      return doc.uid;
  }
};
