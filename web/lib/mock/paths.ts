/**
 * SAMPLE DATA. Modelled on Motqen's مسارات: a sequence with its duration and commitment
 * stated before you start, so somebody can see what they are agreeing to.
 */

export type Path = {
  slug: string;
  tone: "ink" | "olive";
  image: string;
  en: { title: string; blurb: string; facts: [string, string][] };
  ar: { title: string; blurb: string; facts: [string, string][] };
  tr: { title: string; blurb: string; facts: [string, string][] };
};

export const PATHS: Path[] = [
  {
    slug: "anger",
    tone: "ink",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Brooklyn_Museum_-_Arjasp%27s_Horsemen_Killing_Luhrasp_from_the_%22Second_Small_Shahnameh%22_of_Firdausi.jpg",
    en: {
      title: "Holding your temper",
      blurb: "Seven situations on anger, read in order, from the minute it arrives to the week after.",
      facts: [["Length", "7 situations"], ["Pace", "One a day"], ["Reading", "About 15 minutes"]],
    },
    ar: {
      title: "مسار ضبط الغضب",
      blurb: "سبعة مواقف في الغضب تُقرأ بترتيبها، من اللحظة التي يشتد فيها إلى الأسبوع الذي يليه.",
      facts: [["المدة", "سبعة مواقف"], ["الوتيرة", "موقف كل يوم"], ["القراءة", "نحو خمس عشرة دقيقة"]],
    },
    tr: {
      title: "Öfkeni tutmak",
      blurb: "Öfke üzerine yedi durum, sırayla okunur: geldiği dakikadan bir hafta sonrasına.",
      facts: [["Uzunluk", "7 durum"], ["Tempo", "Günde bir"], ["Okuma", "Yaklaşık 15 dakika"]],
    },
  },
  {
    slug: "money",
    tone: "olive",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/Caravanserai_in_Afganistan_by_A.Yakovlev_%281931%29.jpg",
    en: {
      title: "Money between people",
      blurb: "Lending, owing, being asked, and saying no. Five situations that keep coming back.",
      facts: [["Length", "5 situations"], ["Pace", "Read as needed"], ["Reading", "About 12 minutes"]],
    },
    ar: {
      title: "مسار المال بين الناس",
      blurb: "الإقراض والدَّين والسؤال والاعتذار. خمسة مواقف تتكرر أكثر من غيرها.",
      facts: [["المدة", "خمسة مواقف"], ["الوتيرة", "عند الحاجة"], ["القراءة", "نحو اثنتي عشرة دقيقة"]],
    },
    tr: {
      title: "İnsanlar arasında para",
      blurb: "Borç vermek, borçlu olmak, istenmek ve hayır demek. Sürekli geri gelen beş durum.",
      facts: [["Uzunluk", "5 durum"], ["Tempo", "İhtiyaç oldukça"], ["Okuma", "Yaklaşık 12 dakika"]],
    },
  },
];
