export type Category = {
  slug: string;
  label: string;
  short: string;
  mark: string;
  tint: "mint" | "apricot" | "sun";
  description: string;
};

export type Source = {
  title: string;
  publisher: string;
  url: string;
};

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  category: string;
  status: "published" | "planned";
  title: string;
  description: string;
  conclusion?: string;
  sections?: ArticleSection[];
  sources?: Source[];
  relatedSlugs?: string[];
  updatedAt?: string;
};

export const categories: Category[] = [
  { slug: "basic", label: "基本・仕組み", short: "言葉・仕組み", mark: "○", tint: "mint", description: "おなら・放屁・腸内ガスの基本的な言葉と仕組みを整理します。" },
  { slug: "smell", label: "臭い", short: "臭い・成分", mark: "〰", tint: "apricot", description: "臭いに関わる成分と、言い切れない部分を分けて扱います。" },
  { slug: "amount", label: "回数・量・音", short: "回数・音", mark: "∿", tint: "sun", description: "回数や音について、目安と個人差を混同せずに整理します。" },
  { slug: "food", label: "食べ物", short: "食品・飲料", mark: "◇", tint: "mint", description: "食べ物・飲み物との関係を、食品名だけで断定しない形で調べます。" },
  { slug: "scene", label: "時間・場面", short: "朝・夜・生活", mark: "◷", tint: "apricot", description: "朝、食後、睡眠中など、生活の場面から疑問をたどります。" },
  { slug: "body", label: "身体", short: "身体との関係", mark: "+", tint: "sun", description: "身体の感覚として気になる点を、診断を目的とせず整理します。" },
  { slug: "science", label: "科学", short: "腸内細菌・化学", mark: "⌘", tint: "mint", description: "成分・腸内細菌・研究の限界を、資料に沿って見ます。" },
  { slug: "trivia", label: "雑学", short: "動物・文化", mark: "✦", tint: "apricot", description: "おならにまつわる周辺知識を、根拠を添えて扱う予定です。" },
];

export const sourceLibrary = {
  niddkDefinition: {
    title: "Definition & Facts for Gas in the Digestive Tract",
    publisher: "NIDDK / NIH",
    url: "https://www.niddk.nih.gov/health-information/digestive-diseases/gas-digestive-tract/definition-facts",
  },
  niddkSymptoms: {
    title: "Symptoms & Causes of Gas in the Digestive Tract",
    publisher: "NIDDK / NIH",
    url: "https://www.niddk.nih.gov/health-information/digestive-diseases/gas-digestive-tract/symptoms-causes",
  },
  niddkDiet: {
    title: "Eating, Diet, & Nutrition for Gas in the Digestive Tract",
    publisher: "NIDDK / NIH",
    url: "https://www.niddk.nih.gov/health-information/digestive-diseases/gas-digestive-tract/eating-diet-nutrition",
  },
  niddkDiagnosis: {
    title: "Diagnosis of Gas in the Digestive Tract",
    publisher: "NIDDK / NIH",
    url: "https://www.niddk.nih.gov/health-information/digestive-diseases/gas-digestive-tract/diagnosis",
  },
  medlineGas: {
    title: "Gas | Flatulence | Burp",
    publisher: "MedlinePlus / U.S. National Library of Medicine",
    url: "https://medlineplus.gov/gas.html",
  },
  medlineEncyclopedia: {
    title: "Gas – flatulence",
    publisher: "MedlinePlus Medical Encyclopedia",
    url: "https://medlineplus.gov/ency/article/003124.htm",
  },
  pubmedComposition: {
    title: "Meta-Analysis of the Composition of Human Intestinal Gases",
    publisher: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/34623578/",
  },
  pubmedOdor: {
    title: "Identification of gases responsible for the odour of human flatus",
    publisher: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/9771412/",
  },
} satisfies Record<string, Source>;

export const articles: Article[] = [
  {
    slug: "what-is-fart",
    category: "basic",
    status: "published",
    title: "おならとは？なぜ出るのかをわかりやすく解説",
    description: "おならは、消化管のガスが肛門から出る現象です。飲み込んだ空気と、大腸での分解過程が主な出発点になります。",
    conclusion: "おならは、消化管内のガスが肛門から排出される現象です。食事中に飲み込む空気や、大腸で未消化の炭水化物が分解される過程が関わります。量や臭いには個人差があり、それだけで体の状態を決めることはできません。",
    sections: [
      {
        heading: "おならは、消化管のガスが外へ出ること",
        paragraphs: [
          "消化管にあるガスは、口からげっぷとして出ることもあれば、肛門から出ることもあります。日常語では後者を「おなら」と呼ぶのが一般的です。",
          "ガスがあること自体は珍しいことではありません。NIDDKは、消化管にガスがあることや、食後などに多少のガス症状があることは一般的だと説明しています。",
        ],
      },
      {
        heading: "ガスの主な出発点は二つあります",
        paragraphs: [
          "一つは、食べたり飲んだりするときに飲み込む空気です。げっぷとして出なかった空気の一部は、腸を通って肛門から出ることがあります。",
          "もう一つは、大腸での分解過程です。胃や小腸で十分に消化されなかった一部の炭水化物が大腸に届くと、細菌が分解する過程でガスが生じます。どちらがどれほど関わるかは、食事や個人によって変わります。",
        ],
      },
      {
        heading: "回数や臭いだけで判断しない",
        paragraphs: [
          "おならが気になるかどうかは、回数だけでなく、急な変化、痛み、便通の変化、日常生活への影響などを合わせて考える必要があります。",
          "症状が急に変わった場合や、腹痛、便秘・下痢、体重減少などを伴う場合は、自己判断せず医療機関に相談してください。",
        ],
      },
    ],
    sources: [sourceLibrary.niddkDefinition, sourceLibrary.niddkSymptoms],
    relatedSlugs: ["flatus", "components", "why-smells", "how-many-per-day"],
    updatedAt: "2026-08-10",
  },
  {
    slug: "flatus",
    category: "basic",
    status: "published",
    title: "放屁とは？意味・読み方・おならとの違い",
    description: "放屁は「ほうひ」と読み、肛門からガスを出す行為を表す語です。日常語のおならと、医学・英語表現との関係を整理します。",
    conclusion: "放屁は「ほうひ」と読み、肛門からガスを出す行為を指す語です。日常会話では「おなら」が自然で、説明文では「放屁」や「腸内ガス」が使われることがあります。言葉の選び方は文脈によって変わります。",
    sections: [
      {
        heading: "放屁は「おならを出すこと」を表す語",
        paragraphs: [
          "放屁は、屁を放つという意味の日本語です。やや硬い表現ですが、身体からガスが肛門を通って出る行為を表すときに使われます。",
          "「おなら」は同じ現象を日常的に言うときの言葉です。どちらかが正しく、もう一方が誤りという関係ではありません。",
        ],
      },
      {
        heading: "英語では flatus と flatulence が近い言葉です",
        paragraphs: [
          "英語の医療情報では、肛門から出るガスを flatus、ガスが多い・気になる状態を flatulence と表すことがあります。ただし、日本語の「放屁」と一語ずつ完全に対応するわけではありません。",
          "MedlinePlusでも、gas、flatus、flatulence は近い概念として扱われています。用語が気になるときは、言葉そのものよりも、何が起きているかを確かめるのが実用的です。",
        ],
      },
      {
        heading: "相談時は、言葉より状況を伝える",
        paragraphs: [
          "医療機関に相談する場合は、「放屁」という言葉を正確に使えるかより、いつから、どのくらい気になるか、食事や便通の変化があるかを伝えるほうが役立ちます。",
          "NIDDKは、医療者が症状、食事や飲み方、服用中の薬、これまでの病歴などを確認すると説明しています。",
        ],
      },
    ],
    sources: [sourceLibrary.medlineGas, sourceLibrary.niddkDiagnosis],
    relatedSlugs: ["medical-term", "what-is-fart", "components"],
    updatedAt: "2026-08-10",
  },
  {
    slug: "medical-term",
    category: "basic",
    status: "published",
    title: "おならの医学用語は？放屁・排ガスとの違い",
    description: "おならに近い表現には、放屁、腸内ガス、排ガスなどがあります。本サイトでの使い分けと、医療相談で大切な伝え方を整理します。",
    conclusion: "おならを表す日本語は一つに固定されません。放屁は行為、腸内ガスは消化管内のガスという状態、排ガスは文脈により広く使われる表現です。本サイトでは、意味が伝わりやすい言葉を優先します。",
    sections: [
      {
        heading: "本サイトでの用語の整理",
        paragraphs: [
          "「おなら」は日常語として使います。「放屁」は、ガスを肛門から出す行為を説明するときに使います。",
          "「腸内ガス」は、腸の中にあるガスや、その仕組みを説明するときに使います。「排ガス」は一般にガスが排出されることを指せますが、医学用語としての範囲は文脈によって異なります。",
        ],
      },
      {
        heading: "医学的な情報では、複数の言葉が使われます",
        paragraphs: [
          "米国の公的医療情報では、消化管のガスを gas、肛門から出るガスを flatus、ガスが多いことに伴う困りごとを flatulence と表現しています。",
          "そのため、単語を一対一で置き換えるより、記事の中では「ガスそのもの」「出る行為」「困っている症状」を分けて説明するようにしています。",
        ],
      },
      {
        heading: "言葉よりも、経過と組み合わせが重要です",
        paragraphs: [
          "気になる症状を相談するときは、回数、臭い、腹部の張り、便通、食事との関係、いつから変化したかなどを伝えると状況が共有しやすくなります。",
          "医療上の判断は、単語や単一の症状だけで行うものではありません。",
        ],
      },
    ],
    sources: [sourceLibrary.niddkDefinition, sourceLibrary.medlineEncyclopedia, sourceLibrary.niddkDiagnosis],
    relatedSlugs: ["flatus", "what-is-fart", "how-many-per-day"],
    updatedAt: "2026-08-10",
  },
  {
    slug: "components",
    category: "science",
    status: "published",
    title: "おならの成分は何でできている？",
    description: "おならには窒素、酸素、二酸化炭素、水素、メタンなど複数のガスが含まれます。割合が一定ではない理由も説明します。",
    conclusion: "おならは一種類のガスではありません。代表的な成分として窒素、酸素、二酸化炭素、水素、メタンなどが報告されています。割合は食事、飲み込んだ空気、腸内での分解過程、測定条件によって変わるため、単一の比率で決めつけないことが大切です。",
    sections: [
      {
        heading: "代表的な成分は複数あります",
        paragraphs: [
          "人の腸内ガスを対象にしたメタ分析では、窒素、酸素、二酸化炭素、水素、メタンが主要なガスとして整理されています。",
          "ただし、これは誰でも同じ割合になるという意味ではありません。研究間でも成分比にばらつきがあり、食事内容や採取方法の影響も受けます。",
        ],
      },
      {
        heading: "空気由来と腸内の分解由来が重なります",
        paragraphs: [
          "消化管のガスには、食事や飲み物と一緒に飲み込んだ空気が含まれます。また、大腸の細菌が未消化の炭水化物を分解する過程でもガスが生じます。",
          "そのため、「全部が腸内細菌で作られたもの」とも、「全部が飲み込んだ空気」とも言い切れません。",
        ],
      },
      {
        heading: "量と臭いは同じではありません",
        paragraphs: [
          "おならの量が多いことと、強い臭いがあることは別の要素です。臭いには、ごく少量の硫黄を含むガスなどが関わるとされています。",
          "成分の話は、体調を自己診断するためではなく、なぜ一律に説明できないのかを理解するための材料として読むのが安全です。",
        ],
      },
    ],
    sources: [sourceLibrary.pubmedComposition, sourceLibrary.niddkSymptoms, sourceLibrary.medlineGas],
    relatedSlugs: ["why-smells", "what-is-fart", "how-many-per-day"],
    updatedAt: "2026-08-10",
  },
  {
    slug: "why-smells",
    category: "smell",
    status: "published",
    title: "おならはなぜ臭い？",
    description: "多くの腸内ガスは強い臭いを持ちません。臭いには、腸内細菌が関わる少量の硫黄を含むガスなどが関係します。",
    conclusion: "おならの臭いには、腸内の細菌が関わる少量の硫黄を含むガスなどが関係します。多くのガスは強い臭いを持たず、臭いの印象は食事や腸内での過程など複数の要因に左右されます。臭いだけで病気の有無は判断できません。",
    sections: [
      {
        heading: "ガスの大部分と、臭いの成分は別です",
        paragraphs: [
          "MedlinePlusは、多くの場合、ガス自体には強い臭いがなく、大腸の細菌が出す少量の硫黄を含むガスが臭いの一因になると説明しています。",
          "つまり、たくさん出ることと、臭いが強いことは、同じ意味ではありません。",
        ],
      },
      {
        heading: "硫黄を含むガスが関係するという報告があります",
        paragraphs: [
          "健康な成人を対象にした小規模な研究では、硫化水素など硫黄を含むガスの濃度と、評価された臭いの強さに関連がみられました。",
          "この研究は臭いの仕組みを考える手がかりになりますが、個人の臭いから原因を特定したり、病気を判定したりする根拠にはなりません。",
        ],
      },
      {
        heading: "気になるときは、臭い以外の変化も見る",
        paragraphs: [
          "食事や腸内での分解過程によって、臭いの感じ方が変わることはあります。一方で、急な変化や、腹痛、便通の変化、体重減少などを伴う場合は、臭いだけで判断せず医療機関に相談してください。",
          "本サイトでは、臭いを「腸内環境が悪い」などの曖昧な表現で断定しません。",
        ],
      },
    ],
    sources: [sourceLibrary.medlineGas, sourceLibrary.pubmedOdor, sourceLibrary.niddkSymptoms],
    relatedSlugs: ["components", "what-is-fart", "how-many-per-day"],
    updatedAt: "2026-08-10",
  },
  {
    slug: "how-many-per-day",
    category: "amount",
    status: "published",
    title: "おならは1日何回くらい出る？",
    description: "研究・公的情報では、平均的な回数に幅があります。回数だけで正常・異常を決めず、生活への影響や変化を見ます。",
    conclusion: "おならの回数には幅があります。NIDDKは平均を1日8〜14回、25回程度までを正常範囲とする専門家の見解を紹介し、MedlinePlusは多くの人が13〜21回と説明しています。測り方や対象が異なるため、数字だけで正常・異常を決めることはできません。",
    sections: [
      {
        heading: "公的情報でも、示される回数には幅があります",
        paragraphs: [
          "NIDDKは、研究上の平均として1日8〜14回を紹介し、専門家は25回程度までを正常と考える場合があると説明しています。",
          "MedlinePlusは、多くの人が1日に13〜21回ガスを出すと説明しています。これは情報源や集計方法が違うためで、どちらか一つだけを絶対の基準にするものではありません。",
        ],
      },
      {
        heading: "回数より、困りごとと変化を見る",
        paragraphs: [
          "回数が多く感じても、日常生活に支障がなく、急な変化もない場合があります。反対に、回数が特別多くなくても、張りや痛みが強くて困ることもあります。",
          "NIDDKは、頻繁でつらい、または日常生活に影響するガス症状は相談の対象になり得ると説明しています。",
        ],
      },
      {
        heading: "数字で自己診断しない",
        paragraphs: [
          "単日の回数には、食事、炭酸飲料、食べる速さ、便通などさまざまな要素が関わります。回数だけで病気の有無や食品との相性を決めることはできません。",
          "急な変化があった場合や、腹痛、便秘・下痢、体重減少などがある場合は、医療機関に相談してください。",
        ],
      },
    ],
    sources: [sourceLibrary.niddkSymptoms, sourceLibrary.medlineGas, sourceLibrary.niddkDiagnosis],
    relatedSlugs: ["what-is-fart", "components", "why-smells"],
    updatedAt: "2026-08-10",
  },
  { slug: "no-smell", category: "smell", status: "planned", title: "臭くないおならが出るのはなぜ？", description: "ガスの量と臭いの違いを、出典を確認して整理する予定です。" },
  { slug: "sulfur", category: "smell", status: "planned", title: "硫黄のような臭いのおならが出るのはなぜ？", description: "臭いの印象と、説明できる成分・説明できない部分を分けて扱う予定です。" },
  { slug: "sound", category: "amount", status: "planned", title: "おならの音はなぜ鳴る？", description: "音に関する根拠の範囲を確認してから公開します。" },
  { slug: "loud", category: "amount", status: "planned", title: "おならの音が大きくなるのはなぜ？", description: "単純な量の問題にせず、根拠の限界を明記して公開予定です。" },
  { slug: "holding", category: "basic", status: "planned", title: "おならを我慢するとどうなる？", description: "一般論と医療的な相談が必要な場合を分けて整理する予定です。" },
  { slug: "sleep", category: "scene", status: "planned", title: "寝ている間にもおならは出る？", description: "睡眠中の情報は根拠を確認してから公開します。" },
  { slug: "morning", category: "scene", status: "planned", title: "朝におならが多いのはなぜ？", description: "朝の現象について、推測と確認済みの情報を分けて公開予定です。" },
  { slug: "after-meal", category: "scene", status: "planned", title: "食後におならが出やすいのはなぜ？", description: "食事中の空気と腸内での分解過程を中心に整理する予定です。" },
  { slug: "sweet-potato", category: "food", status: "planned", title: "さつまいもを食べるとおならが出るのはなぜ？", description: "食品名だけで断定しない形で、成分と個人差を整理する予定です。" },
  { slug: "beans", category: "food", status: "planned", title: "豆を食べるとおならが増えるのはなぜ？", description: "豆類と未消化の炭水化物、腸内細菌の関係を整理する予定です。" },
  { slug: "milk", category: "food", status: "planned", title: "牛乳を飲むとおならが出るのはなぜ？", description: "乳糖の消化などを、診断と切り分けて説明する予定です。" },
{ slug: "protein", category: "food", status: "planned", title: "プロテインとおならの関係", description: "製品ごとの原材料差を前提に、根拠を確認して公開します。" },
{ slug: "carbonated-drinks", category: "food", status: "planned", title: "炭酸飲料とおならの関係", description: "飲み込む気体と腸内ガスを混同しないように整理する予定です。" },
{ slug: "onion", category: "food", status: "planned", title: "玉ねぎでおならが気になるのはなぜ？", description: "発酵しやすい成分や食べる量、個人差を分けて整理する予定です。" },
{ slug: "yogurt", category: "food", status: "planned", title: "ヨーグルトとおならの関係", description: "乳成分、菌の種類、食べる量による違いを確認して公開します。" },
{ slug: "egg", category: "food", status: "planned", title: "卵とおならの臭いは関係する？", description: "たんぱく質や硫黄を含む成分との関係を、断定しすぎず整理します。" },
{ slug: "meat", category: "food", status: "planned", title: "肉を食べるとおならは臭くなる？", description: "食事全体のたんぱく質量や便通との関係を確認して公開します。" },
{ slug: "fiber", category: "food", status: "planned", title: "食物繊維でおならが増えるのは悪いこと？", description: "急に増やしたときのガス感と、食生活での大切さを分けて扱います。" },
{ slug: "night", category: "scene", status: "planned", title: "夜におならが気になるときの見方", description: "一日の食事や腸の動きが積み重なる場面として整理する予定です。" },
{ slug: "empty-stomach", category: "scene", status: "planned", title: "空腹時におならが出ることはある？", description: "食後以外でもガスが動く理由を、生活場面として整理します。" },
{ slug: "workplace", category: "scene", status: "planned", title: "職場でおならが気になるとき", description: "食事、飲み方、席を立つタイミングなど現実的な工夫を整理します。" },
{ slug: "date", category: "scene", status: "planned", title: "デート前におならが不安なとき", description: "直前に無理をしないための食事・飲み方の見方を扱います。" },
{ slug: "exercise", category: "scene", status: "planned", title: "運動中におならが出そうになるのはなぜ？", description: "姿勢、腹圧、運動前の食事との関係を整理する予定です。" },
{ slug: "gut-bacteria", category: "science", status: "planned", title: "おならと腸内細菌の関係", description: "腸内細菌を単純に善悪で分けず、研究の限界も添えて公開します。" },
];

export const publishedArticles = articles.filter((article): article is Article & { status: "published" } => article.status === "published");
export const plannedArticles = articles.filter((article): article is Article & { status: "planned" } => article.status === "planned");
export const foodTopics = ["さつまいも", "豆", "牛乳", "プロテイン", "玉ねぎ", "炭酸飲料", "ヨーグルト", "卵", "肉", "食物繊維"];
export const sceneTopics = ["朝", "夜", "寝ている時", "食後", "空腹時", "職場", "デート", "運動中"];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getArticle(category: string, slug: string) {
  return articles.find((article) => article.category === category && article.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getPublishedByCategory(category: string) {
  return publishedArticles.filter((article) => article.category === category);
}

export function getPlannedByCategory(category: string) {
  return plannedArticles.filter((article) => article.category === category);
}

export function getRelatedPublishedArticles(article: Article) {
  return (article.relatedSlugs ?? [])
    .map((slug) => getArticleBySlug(slug))
    .filter((candidate): candidate is Article => Boolean(candidate && candidate.status === "published"));
}

export function categoryName(slug: string) {
  return getCategory(slug)?.label ?? "おなら研究所";
}

export function articleUrl(article: Pick<Article, "category" | "slug">) {
 return `/${article.category}/${article.slug}`;
}
