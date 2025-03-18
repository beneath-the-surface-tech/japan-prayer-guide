## ADR-0004 - Decide on the type of localization support for phase 1

### Context

Given that this is a prayer resource for international supports of Japanese missions, as well as a resource for missionaries in Japan, it is a given that we will need to support English and Japanese at a bare minimum. Although content & (maybe audio) is still pending translation, there is definite need for the site to be built in a way that supports multiple languages.

### Decision

- Use `next-i18next` for localization.
- Preference towards making things easy for editors
    - Follow the standard of `public/locale/<lang>/...` to keep all the files in an easy place
    - Preference on more .json files over lots of nesting

### Status

✅ CONFIRMED 2023/02/28

### Consequences

Note: The solution we end up using must still somehow satisfy the desire for article content (topics or otherwise) to be easily modified / edited.

It's not a trivial matter to add or change language support structure after the fact, so care needs to be taken with the approach that is proposed.


### Additional Information

- NextJS's own doc for internationalized routing https://nextjs.org/docs/advanced-features/i18n-routing
- next-i18-next for simplified handling of localization via locale folders with .json files
    - link: https://github.com/i18next/next-i18next
    - sample: https://github.com/i18next/next-i18next/tree/master/examples/simple
- alternatively (or in addition?) the article content lang support could be handled separately:

~~~
// Sample pseudocode for pages/[lang]/topics/[topicPage].js file

import { useRouter } from 'next/router'
import { getTopicPaths, getTopicMetadata } from '../../services/staticTopicLoader'
import { loadMarkdownByLang } from '../../services/markdownService'

export async function getServerSideProps({ params }) {
    const { lang, id } = params
    const topicMetadata = await getTopicMetadata(lang, id)
    let markdownSections: string[] = [];
    topicMetadata.contentFilename.forEach((fileName: string) => {
        markdownSections.push(loadMarkdownByLang(topicMetadata.folderPath, fileName, lang));
    });
    topicMetadata.markdownSections = markdownSections;

    return { props: { topicMetadata } }
}

export async function getStaticPaths() {
    const paths = await getTopicPaths()
    return { paths, fallback: false }
}

export default function TopicPage({ topicMetadata }) {
    const router = useRouter()
    const { lang } = router.query
    // Render content using react-markdown
    return <div>...</div>
}
~~~

~~~
// Sample pseudocode for the markdownService
export function loadMarkdownFile(folderPath, filename, language) {
  const staticPageDirectory = path.join(process.cwd(), folderPath);
  const fullPath = path.join(staticPageDirectory, `${filename}-${language}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return fileContents;
};
~~~
