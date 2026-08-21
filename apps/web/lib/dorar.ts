/**
 * The dorar.net row a citation is copied from, verbatim. `id` is their permalink
 * (dorar.net/h/{id}); `takhrij` their cross-references; `categories` their
 * التصنيف الموضوعي, each linking to dorar.net/hadith-category/cat/{id}.
 */
export type DorarRef = {
  rawi: string;
  mohdith: string;
  grade: string;
  id: string;
  takhrij?: string;
  categories: { id: string; name: string }[];
};
